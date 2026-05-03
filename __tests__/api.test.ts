process.env.GROQ_API_KEY = "test_key";
import { POST } from '../src/app/api/query/route';
import { createMocks } from 'node-mocks-http';

jest.mock('firebase/firestore', () => {
  const mCollection = jest.fn((db, name) => name);
  const mGetDocs = jest.fn((collectionName) => {
    if (collectionName === 'faqs') {
      return Promise.resolve({
        docs: [
          {
            id: '1',
            data: () => ({
              question: 'What is Lok Sabha?',
              answer: 'The Lok Sabha is the lower house of India\'s bicameral Parliament.',
              category: 'National',
              keywords: ['lok', 'sabha']
            })
          }
        ]
      });
    }
    if (collectionName === 'locations') {
      return Promise.resolve({
        docs: [
          {
            id: '1',
            data: () => ({
              name: 'karnataka',
              description: 'Karnataka holds State Assembly elections.'
            })
          }
        ]
      });
    }
    if (collectionName === 'elections') {
      return Promise.resolve({
        docs: [
          {
            id: '1',
            data: () => ({
              state: 'karnataka',
              next_election: '2028',
              lok_sabha_seats: 28
            })
          }
        ]
      });
    }
    return Promise.resolve({ docs: [] });
  });

  return { collection: mCollection, getDocs: mGetDocs };
});

jest.mock('../src/lib/firebase', () => ({ db: {} }));

jest.mock('groq-sdk', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: 'AI generated response.' } }]
        })
      }
    }
  }));
});

describe('/api/query API Endpoint', () => {
  it('returns 400 for missing question', async () => {
    const req = new Request('http://localhost/api/query', { method: 'POST', body: JSON.stringify({}) });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns Location Info when query matches location directly', async () => {
    const req = new Request('http://localhost/api/query', {
      method: 'POST',
      body: JSON.stringify({ question: 'Elections in Karnataka' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(data.source).toBe('Location Info');
    expect(data.answer).toContain('Karnataka holds State Assembly elections');
    expect(data.answer).toContain('2028');
  });

  it('returns Location Info when context provides location', async () => {
    const req = new Request('http://localhost/api/query', {
      method: 'POST',
      body: JSON.stringify({ question: 'When are the next elections?', location: 'Karnataka' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(data.source).toBe('Location Info');
    expect(data.answer).toContain('Karnataka holds State Assembly elections');
  });

  it('returns FAQ match for queries', async () => {
    const req = new Request('http://localhost/api/query', {
      method: 'POST',
      body: JSON.stringify({ question: 'What is Lok Sabha?' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(data.source).toBe('FAQ');
    expect(data.answer).toContain('lower house');
  });

  it('falls back to AI for unknown queries', async () => {
    const req = new Request('http://localhost/api/query', {
      method: 'POST',
      body: JSON.stringify({ question: 'Who is the best singer?' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(data.source).toBe('AI');
    expect(data.answer).toBe('AI generated response.');
  });
});
