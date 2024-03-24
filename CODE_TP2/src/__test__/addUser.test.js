const { addUser } = require('../controllers/users/addUser');
const { crud, validateUser } = require('../controllers/users/head');

describe('addUser function', () => {
    let req, res, next, mockCrudFind, mockCrudInsertOne, mockValidateUser;

    beforeEach(() => {
        req = { body: { username: 'testuser' } };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        next = jest.fn();
        mockCrudFind = jest.spyOn(crud, 'find');
        mockCrudInsertOne = jest.spyOn(crud, 'insertOne');
        mockValidateUser = jest.spyOn(validateUser, 'validate');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add user if validation passes and user does not exist', async () => {
        mockValidateUser.mockReturnValue({ errors: [] });
        mockCrudFind.mockResolvedValue([]);
        mockCrudFind.mockResolvedValue([]);
        mockCrudInsertOne.mockResolvedValue({ id: 1, username: 'testuser' });

        await addUser(req, res, next);

        expect(mockValidateUser).toHaveBeenCalledWith({ username: 'testuser' });
        expect(mockCrudFind).toHaveBeenCalledWith('users', {});
        expect(mockCrudInsertOne).toHaveBeenCalledWith('users', { id: 1, username: 'testuser' });
        expect(res.json).toHaveBeenCalledWith({ id: 1, username: 'testuser' });
    });

    test('should return validation errors if validation fails', async () => {
        mockValidateUser.mockReturnValue({ errors: ['Username is required'] });

        await addUser(req, res, next);

        expect(mockValidateUser).toHaveBeenCalledWith({ username: 'testuser' });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(['Username is required']);
        expect(mockCrudFind).not.toHaveBeenCalled();
        expect(mockCrudInsertOne).not.toHaveBeenCalled();
    });

    test('should return error if user already exists', async () => {
        mockValidateUser.mockReturnValue({ errors: [] });
        mockCrudFind.mockResolvedValue([{ id: 1, username: 'testuser' }]);

        await addUser(req, res, next);

        expect(mockValidateUser).toHaveBeenCalledWith({ username: 'testuser' });
        expect(mockCrudFind).toHaveBeenCalledWith('users', {});
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(['User already exists']);
        expect(mockCrudInsertOne).not.toHaveBeenCalled();
    });

    test('should handle error if database search fails', async () => {
        mockValidateUser.mockReturnValue({ errors: [] });
        mockCrudFind.mockRejectedValue(new Error('Database error'));

        await addUser(req, res, next);

        expect(mockValidateUser).toHaveBeenCalledWith({ username: 'testuser' });
        expect(mockCrudFind).toHaveBeenCalledWith('users', {});
        expect(next).toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(mockCrudInsertOne).not.toHaveBeenCalled();
    });

    test('should handle error if database insertion fails', async () => {
        mockValidateUser.mockReturnValue({ errors: [] });
        mockCrudFind.mockResolvedValue([]);
        mockCrudInsertOne.mockRejectedValue(new Error('Database error'));

        await addUser(req, res, next);

        expect(mockValidateUser).toHaveBeenCalledWith({ username: 'testuser' });
        expect(mockCrudFind).toHaveBeenCalledWith('users', {});
        expect(mockCrudInsertOne).toHaveBeenCalledWith('users', { id: 1, username: 'testuser' });
        expect(next).toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
