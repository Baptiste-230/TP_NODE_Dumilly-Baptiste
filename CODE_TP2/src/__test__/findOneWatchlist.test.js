const { findOneWatchlist } = require('../controllers/watchlists/findOneWatchlist');
const { crud } = require('../controllers/watchlists/head');

describe('findOneWatchlist function', () => {
    let req, res, next, mockCrudFindOne;

    beforeEach(() => {
        req = { params: { id: '1' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
        next = jest.fn();
        mockCrudFindOne = jest.spyOn(crud, 'findOne');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should find and return watchlist if it exists', async () => {
        const mockWatchlist = { id: 1, name: 'Test Watchlist' };
        mockCrudFindOne.mockResolvedValue(mockWatchlist);

        await findOneWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { id: 1 });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockWatchlist);
        expect(res.send).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should return error if watchlist does not exist', async () => {
        mockCrudFindOne.mockResolvedValue(null);

        await findOneWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { id: 1 });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Watchlist non trouvée');
        expect(res.json).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle error if database search fails', async () => {
        const mockError = new Error('Database error');
        mockCrudFindOne.mockRejectedValue(mockError);

        await findOneWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { id: 1 });
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.send).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
