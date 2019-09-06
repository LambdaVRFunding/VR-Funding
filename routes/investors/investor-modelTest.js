const db = require('../../data/dbConfig');
const Investors = require('./investor-model');

describe('investor model', () => {
    describe('addFundsToProj()', () => {
        beforeEach(async () => {
            await db('transactions').truncate();
        });

        it('should add 2 transactions', async () => {
            await Investors.addFundsToProj( 1, 1, 200 );
            await Investors.addFundsToProj( 1, 2, 500 );

            const transactions = await db('transactions').where({ investor_id: 1 });
            expect(transactions).toHaveLength(2);
        })  
    })

    describe('getTransactions()', () => {
        it('should return a list of transactions', async () => {
            const investor_id = 1;

            const transactions = await Investors.getTransactions( investor_id );
            expect(transactions).toHaveLength(2);
        })
    })

    describe('getFundedProjects()', () => {
        it('should return a list of funded projects', async () => {
            const investor_id = 1;

            const fundedProjects = await Investors.getFundedProjects( investor_id );
            expect(fundedProjects).toHaveLength(2);
        })
    })

    describe('updateProjectCurrentFunds()', () => {
        it('should update a projects current amount funded', async () => {
            await Investors.updateProjectCurrentFunds(2, 200);

            const [updatedProj] = await db('projects').where({ id: 2 });
            expect( updatedProj.fund_current ).toBe(200);
        })
    })
})