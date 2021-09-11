const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain',()=>{

    let bc;
    let bc2;

    beforeEach(()=>{
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    /** TESTING THAT IT STARTS WITH GENESIS BLOCK */
    it('startss with the genesis block',()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    /** TESTING THAT IT SUCCESSFULLY ADDED DATA IN THE BC */
    it('adds a new block',()=>{
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain', ()=>{
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    /** TEST A CORRUPT GENESIS BLOCK */
    it('invalidates a chain with a corrupt genesis block',()=>{
        bc2.chain[0].data = 'Bad Data';
        expect(bc.isValidChain(bc2.chain)).toEqual(false);

    });


    /** BAD BLOCK THAT ISN'T THE GENESIS BLOCK */
    it('invalidates a corrupt chain',()=>{
        bc2.addBlock('foo');        
        bc2.chain[1].data = 'Not foo';
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });


    /** WILL ENSURE THAT THE CHAIN IS REPLACED */
    it('replaces the chain with valid chain',()=>{
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the chain with one of less than or equal to length',()=>{
        bc.addBlock('foo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });


})