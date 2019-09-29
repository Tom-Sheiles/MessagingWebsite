var assert = require('assert');
var chai = require('chai'), chaiHttp = require("chai-http");
chai.use(chaiHttp);
var expect = chai.expect;

var app = 'localhost:3000';

describe("Authentication Test",()=>{
    describe("Successful login",()=>{
        it("Should return valid",()=>{
            chai.request(app)
            .post('/auth')
            .send({userName:"supp"})
            .end((err, res)=>{
                expect(res.body.res).to.equal("valid");
            })
        })
    })
    describe("Unsuccessful Login",()=>{
        it("Should return invalid",()=>{
            chai.request(app)
            .post('/auth')
            .send({userName:"user2",password:"pass"})
            .end((err,res)=>{
                expect(res.body.valid).to.equal("Password Incorrect")
            })
        })
    })
    describe("Account not found",()=>{
        it("should return account not found",()=>{
            chai.request(app)
            .post("/auth")
            .send({userName:"supp2"})
            .end((err,res)=>{
                expect(res.body.res).to.equal("invalid")
            })
        })
    })

    describe("Register Route",()=>{
        describe("Register new account",()=>{
            it("should return account registerd",(done)=>{
                chai.request(app)
                .post("/register")
                .send({userName:"newUser",password:"123",email:"example@mail.com"})
                .end((err,res)=>{
                    done();
                    if(res.body.register == "userCreated")
                        expect(res.body.register).to.equal("userCreated")
                    else
                        assert.fail("Failed")
                })
            })
        })
        describe("Already existing user",()=>{
            it("should return user exists",(done)=>{
                chai.request(app)
                .post('/register')
                .send({userName:"user2",password:"123",email:"email@mail.com"})
                .end((err,res)=>{
                    done();
                    if(res.body.register == "userExists")
                        expect(res.body.register).to.equal("userExists");
                    else
                        assert.fail("Failed")
                })
            })
        })
    })
   
})