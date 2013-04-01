var expect = chai.expect;

describe('Presentation', function() {

    var presentation;

    beforeEach(function() {
        presentation = new Presentation({
            baseEl: $('<div></div>')
        });
    });

    it('should test', function() {
        expect(true).to.equal(true);
    });

});
