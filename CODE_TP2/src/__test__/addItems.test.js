const { addItem } = require('../controllers/items/addItem');
const { crud } = require('../controllers/items/head');
const axios = require('axios');

jest.mock('axios');

describe('addItem function', () => {
    let req, res, next, mockCrudFind, mockCrudInsertOne;

    beforeEach(() => {
        req = { body: { titre: 'Interstellar' } };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        next = jest.fn();
        mockCrudFind = jest.spyOn(crud, 'find');
        mockCrudInsertOne = jest.spyOn(crud, 'insertOne');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add item if not already existing and found in OMDB API', async () => {
        mockCrudFind.mockResolvedValue([]);
        axios.get.mockResolvedValue({ data: { Response: 'True', Year: '2022', Director: 'Director', Plot: 'Plot', Language: 'Language', Type: 'Type' } });

        await addItem(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('items', { titre: 'Interstellar' });
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Interstellar'));
        expect(mockCrudInsertOne).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalled();
    });

    test('should return error if item already exists', async () => {
        mockCrudFind.mockResolvedValue([{ some: 'item' }]);

        await addItem(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('items', { titre: 'Interstellar' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Item déjà existant' });
        expect(axios.get).not.toHaveBeenCalled();
        expect(mockCrudInsertOne).not.toHaveBeenCalled();
    });

    test('should return error if item not found in OMDB API', async () => {
        mockCrudFind.mockResolvedValue([]);
        axios.get.mockResolvedValue({ data: { Response: 'False' } });

        await addItem(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('items', { titre: 'Interstellar' });
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Interstellar'));
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Item non trouvée!' });
        expect(mockCrudInsertOne).not.toHaveBeenCalled();
    });

    test('should handle error if OMDB API call fails', async () => {
        mockCrudFind.mockResolvedValue([]);
        axios.get.mockRejectedValue(new Error('API error'));

        await addItem(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('items', { titre: 'Interstellar' });
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('Interstellar'));
        expect(next).toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(mockCrudInsertOne).not.toHaveBeenCalled();
    });
});
