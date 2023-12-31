const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth API', () => {
    it('should register a new user', (done) => {
        chai.request(app)
            .post('/api/auth/sign-up') 
            .send({
                userName: 'testuser2',
                password: 'testpassword2',
                email: 'testemail2@gmail.com'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Inscription réussie !');
                done();
            });
    });
});
