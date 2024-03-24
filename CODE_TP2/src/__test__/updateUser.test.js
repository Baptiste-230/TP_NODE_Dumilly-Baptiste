const { updateUser } = require('../controllers/users/updateUser');
const { crud } = require('../controllers/users/head');

describe('updateUser function', () => {
    let req, res, next, mockCrudFindOne, mockCrudUpdateOne;

    beforeEach(() => {
        req = { params: { userId: '1' }, body: { username: 'updatedUsername' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        next = jest.fn();
        mockCrudFindOne = jest.spyOn(crud, 'findOne');
        mockCrudUpdateOne = jest.spyOn(crud, 'updateOne');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should update user if user found and update successful', async () => {
        const mockUser = { id: 1, username: 'originalUsername' };
        const mockUpdatedUser = { id: 1, username: 'updatedUsername' };
        mockCrudFindOne.mockResolvedValue(mockUser);
        mockCrudUpdateOne.mockResolvedValue(mockUpdatedUser);

        await updateUser(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('users', { id: 1 });
        expect(mockCrudUpdateOne).toHaveBeenCalledWith('users', { id: 1 }, { $set: { username: 'updatedUsername' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
        expect(next).not.toHaveBeenCalled();
    });

    test('should return error if user not found', async () => {
        mockCrudFindOne.mockResolvedValue(null);

        await updateUser(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('users', { id: 1 });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Utilisateur non trouvé' });
        expect(mockCrudUpdateOne).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('should handle error if update fails', async () => {
        const mockError = new Error('Database error');
        mockCrudFindOne.mockResolvedValue({ id: 1, username: 'originalUsername' });
        mockCrudUpdateOne.mockRejectedValue(mockError);

        await updateUser(req, res, next);

        expect(mockCrudFindOne).toHaveBeenCalledWith('users', { id: 1 });
        expect(mockCrudUpdateOne).toHaveBeenCalledWith('users', { id: 1 }, { $set: { username: 'updatedUsername' } });
        expect(next).toHaveBeenCalledWith(mockError);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
