var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    sandboxedModule = require('sandboxed-module'),
    support = require('../support');

chai.use(require('sinon-chai'));

describe('Cli', function() {

    var sandboxedCli, cli, exitSpy, stdoutSpy, fakeServerModule, serverListenSpy,
        fakeGeneratorModule;

    function startSandboxedCliWith(command) {
        exitSpy = sinon.spy();
        stdoutSpy = sinon.spy();
        serverListenSpy = sinon.spy();
        fakeServerModule = {
            getServer: function() {
                return {listen: serverListenSpy};
            }
        },
        fakeGeneratorModule = {
            generate: sinon.spy()
        };

        var argv = ['node', 'lux'];
        if (command) argv.push(command);

        sandboxedCli = sandboxedModule.load(support.LIB + 'cli', {
            requires: {
                './server': fakeServerModule,
                './generator': fakeGeneratorModule
            },
            globals: {
                process: {
                    argv: argv,
                    exit: exitSpy,
                    stdout: { write: stdoutSpy }
                }
            }
        });
        cli = sandboxedCli.exports;
        cli.start();
    }

    describe('when no command is passed', function() {

        beforeEach(function() {
            startSandboxedCliWith();
        });

        it('should print an error', function() {
            expect(stdoutSpy).to.have.been.calledWith('No command specified.');
        });

        it('should exit with an error', function() {
            expect(exitSpy).to.have.been.calledWith(127);
        });

    });

    describe('when started', function() {

        beforeEach(function() {
            startSandboxedCliWith('start');
        });

        it('should start the server', function() {
            expect(serverListenSpy).to.have.been.called;
        });

    });

    describe('when "generate" is called', function() {
        beforeEach(function() {
            startSandboxedCliWith('generate');
        });

        it('should start the generator', function() {
            expect(fakeGeneratorModule.generate).to.have.been.called;
        });
    });

});
