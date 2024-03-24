const { findWatchlist } = require('../controllers/watchlists/findWatchlist');
const { crud } = require('../controllers/watchlists/head');

describe('findWatchlist function', () => {
    let req, res, next, mockCrudFind;

    beforeEach(() => {
        req = { query: { userId: '1' } };
        res = { json: jest.fn() };
        next = jest.fn();
        mockCrudFind = jest.spyOn(crud, 'find');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should find watchlists based on query parameters', async () => {
        const mockResult = [{ id: 1, name: 'Watchlist 1' }, { id: 2, name: 'Watchlist 2' }];
        mockCrudFind.mockResolvedValue(mockResult);

        await findWatchlist(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('watchlists', { userId: '1' });
        expect(res.json).toHaveBeenCalledWith(mockResult);
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle error if database search fails', async () => {
        const mockError = new Error('Database error');
        mockCrudFind.mockRejectedValue(mockError);

        await findWatchlist(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('watchlists', { userId: '1' });
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.json).not.toHaveBeenCalled();
    });
});
