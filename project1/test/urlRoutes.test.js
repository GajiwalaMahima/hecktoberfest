const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const bodyParser = require('body-parser');
const urlRouter = require('../routes/urlRoutes');

chai.use(chaiHttp);
const { expect } = chai;

const app = express();
app.use(bodyParser.json());
app.use('/', urlRouter);

let mongoServer;
before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('URL Shortener API', () => {

    describe('POST /shorten', () => {
        it('should return 400 if the URL is invalid', (done) => {
            chai.request(app)
                .post('/shorten')
                .send({ longUrl: 'invalid-url' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message').eql('Invalid URL');
                    done();
                });
        });

        it('should shorten a valid URL and return 201', (done) => {
            const validUrl = 'https://localhost:3000';
            chai.request(app)
                .post('/shorten')
                .send({ longUrl: validUrl })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('shortUrl').that.includes('http');
                    done();
                });
        });

        it('should return the existing short URL if the long URL already exists', (done) => {
            const validUrl = 'https://localhost:3000';

            chai.request(app)
                .post('/shorten')
                .send({ longUrl: validUrl })
                .end((err, res) => {
                    const shortUrl = res.body.shortUrl;


                    chai.request(app)
                        .post('/shorten')
                        .send({ longUrl: validUrl })
                        .end((err, res2) => {
                            expect(res2).to.have.status(200);
                            expect(res2.body.shortUrl).to.equal(shortUrl);
                            done();
                        });
                });
        });
    });

    describe('GET /:shortUrl', () => {
        it('should return 404 if the short URL does not exist', (done) => {
            chai.request(app)
                .get('/nonexistent-url')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').eql('Short URL not found');
                    done();
                });
        });

        it('should redirect to the original URL if the short URL exists', (done) => {
            const validUrl = 'https://localhost:3000';

            chai.request(app)
                .post('/shorten')
                .send({ longUrl: validUrl })
                .end((err, res) => {
                    const shortUrl = res.body.shortUrl.split('/').pop();


                    chai.request(app)
                        .get(`/${shortUrl}`)
                        .end((err, res2) => {
                            expect(res2).to.redirectTo(validUrl);
                            done();
                        });
                });
        });
    });
});