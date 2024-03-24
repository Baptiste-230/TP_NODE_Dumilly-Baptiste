const { addWatchlist } = require('../controllers/watchlists/addWatchlist');
const { crud } = require('../controllers/watchlists/head');

describe('addWatchlist function', () => {
    let req, res, next, mockCrudFindOne, mockCrudFind;

    beforeEach(() => {
        req = { body: { utilisateurId: 1, nom: 'testWatchlist' } };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        next = jest.fn();
        mockCrudFindOne = jest.spyOn(crud, 'findOne');
        mockCrudFind = jest.spyOn(crud, 'find');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add watchlist if user exists and watchlist does not already exist', async () => {
        mockCrudFindOne.mockResolvedValueOnce({ id: 1, username: 'testuser' }).mockResolvedValueOnce(null);
        mockCrudFind.mockResolvedValueOnce([]);

        await addWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('users', { id: 1 });
        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { utilisateurId: 1, nom: 'testwatchlist' });
        expect(mockCrudFind).toHaveBeenCalledWith('watchlists', {}, { id: -1 });
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should return error if user does not exist', async () => {
        mockCrudFindOne.mockResolvedValueOnce(null);

        await addWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('users', { id: 1 });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'User non trouvée' });
        expect(next).not.toHaveBeenCalled();
    });

    test('should return error if watchlist already exists for user', async () => {
        mockCrudFindOne.mockResolvedValueOnce({ id: 1, username: 'testuser' }).mockResolvedValueOnce({ id: 1, nom: 'testWatchlist' });

        await addWatchlist(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('users', { id: 1 });
        expect(mockCrudFindOne).toHaveBeenCalledWith('watchlists', { utilisateurId: 1, nom: 'testwatchlist' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Watchlist déjà existante' });
        expect(next).not.toHaveBeenCalled();
    });
});
