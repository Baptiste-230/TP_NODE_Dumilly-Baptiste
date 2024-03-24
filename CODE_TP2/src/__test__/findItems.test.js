const { findItem } = require('../controllers/items/findItem');
const { crud } = require('../controllers/items/head');

describe('findItem function', () => {
    let req, res, next, mockCrudFind;

    beforeEach(() => {
        req = { query: { key: 'value' } };
        res = { json: jest.fn() };
        next = jest.fn();
        mockCrudFind = jest.spyOn(crud, 'find');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should find item in the database', async () => {
        const mockResult = [{ some: 'item' }];
        mockCrudFind.mockResolvedValue(mockResult);

        await findItem(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('items', { key: 'value' });
        expect(res.json).toHaveBeenCalledWith(mockResult);
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle error if database search fails', async () => {
        const mockError = new Error('Database error');
        mockCrudFind.mockRejectedValue(mockError);

        await findItem(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('items', { key: 'value' });
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.json).not.toHaveBeenCalled();
    });
});
