const { updateState } = require('../controllers/watchlists/updateState');
const { crud } = require('../controllers/watchlists/head');

jest.mock('../controllers/watchlists/head');

describe('updateState function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update item state correctly', async () => {
        const req = {
            body: {
                utilisateurId: 'user_id',
                watchlistId: 'watchlist_id',
                itemId: 'item_id',
                etat: 'à voir'
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        crud.findOne.mockResolvedValueOnce({ id: 'user_id' }); 
        crud.findOne.mockResolvedValueOnce({ id: 'watchlist_id' }); 
        crud.findOne.mockResolvedValueOnce({ id: 'item_id' }); 

        crud.updateOne.mockResolvedValue({ success: true });

        await updateState(req, res);

        expect(crud.findOne).toHaveBeenCalledTimes(3);
        expect(crud.updateOne).toHaveBeenCalledTimes(1);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

});
