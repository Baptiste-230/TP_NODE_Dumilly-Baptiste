const { findUser } = require('../controllers/users/findUser');
const { crud } = require('../controllers/users/head');

describe('findUser function', () => {
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

    test('should find user in the database', async () => {
        const mockResult = [{ some: 'user' }];
        mockCrudFind.mockResolvedValue(mockResult);

        await findUser(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('users', { key: 'value' });
        expect(res.json).toHaveBeenCalledWith(mockResult);
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle error if database search fails', async () => {
        const mockError = new Error('Database error');
        mockCrudFind.mockRejectedValue(mockError);

        await findUser(req, res, next);

        expect(mockCrudFind).toHaveBeenCalledWith('users', { key: 'value' });
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.json).not.toHaveBeenCalled();
    });
});
