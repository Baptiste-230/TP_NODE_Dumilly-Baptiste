const { addItemToWatchlist } = require('../controllers/watchlists/addItemToWatchlist');
const { crud } = require('../controllers/watchlists/head');

describe('addItemToWatchlist function', () => {
    let req, res, next, mockCrudFindOne, mockCrudUpdateOne;

    beforeEach(() => {
        req = { body: { utilisateurId: 1, watchlistId: 1, itemId: 1, etat: 'to_watch' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        mockCrudFindOne = jest.spyOn(crud, 'findOne');
        mockCrudUpdateOne = jest.spyOn(crud, 'updateOne');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add item to watchlist if item, watchlist, and user exist and item not already in watchlist', async () => {
        const mockItem = { id: 1, titre: 'Mock Item' };
        const mockWatchlist = { id: 1, items: [] };
        mockCrudFindOne.mockResolvedValueOnce(mockItem).mockResolvedValueOnce(mockWatchlist).mockResolvedValueOnce({}).mockResolvedValueOnce(null);

        await addItemToWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('items', { id: 1 });
        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { id: 1 });
        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { id: 1, utilisateurId: 1 });
        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { id: 1, 'items.film': 1 });
        expect(mockCrudUpdateOne).toHaveBeenCalledWith('watchlists', { id: 1 }, { $push: { items: { film: 1, titre: 'Mock Item', etat: 'to_watch' } } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
