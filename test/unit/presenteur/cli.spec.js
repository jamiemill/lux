var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    request = require('supertest'),
    sandboxedModule = require('sandboxed-module'),
    support = require('../../support');

chai.use(require('sinon-chai'));

describe('Cli', function() {

    var sandboxedCli, cli, exitSpy, stdoutSpy, serverSpy;

    function getGlobals(command) {
        exitSpy = sinon.spy();
        stdoutSpy = sinon.spy();
        serverListenSpy = sinon.spy();
        serverSpy = {
            getServer: function() {
                return {listen: serverListenSpy};
            }
        };
        var argv = ['node', 'presenteur'];
        if (command) argv.push(command);
        var requires = {};
        return {
            process: {
                argv: argv,
                exit: exitSpy,
                stdout: { write: stdoutSpy }
            }
        };
    }

    describe('when no command is passed', function() {

        beforeEach(function() {
            sandboxedCli = sandboxedModule.load(support.LIB + 'presenteur/cli', {
                requires: {
                    './server': serverSpy
                },
                globals: getGlobals()
            });
            cli = sandboxedCli.exports;
            cli.start();
        });

        it('should print an error', function() {
            expect(stdoutSpy).to.have.been.calledWith('No command specified.');
        });

        it('should exit with an error if no command is passed', function() {
            expect(exitSpy).to.have.been.calledWith(127);
        });

    });

    describe('when started', function() {

        beforeEach(function() {
            sandboxedCli = sandboxedModule.load(support.LIB + 'presenteur/cli', {
                requires: {
                    './server': serverSpy
                },
                globals: getGlobals('start')
            });
            cli = sandboxedCli.exports;
            cli.start();
        });

        it('should print nothing', function() {
            expect(stdoutSpy).not.to.have.been.called;
        });

        it('should not exit', function() {
            expect(exitSpy).not.to.have.been.called;
        });

        it('should start the server', function() {
            expect(serverListenSpy).to.have.been.called;
        });

    });

});
