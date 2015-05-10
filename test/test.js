describe('getFolders', function() {
  it('should return list of folders', function() {
    var objects = [
      { Key: '/' },
      { Key: 'test/' },
      { Key: 'test/test/' },
      { Key: 'test/a/b' },
      { Key: 'test' },
    ];
    chai.expect(dodgercms.utils.getFolders(objects)).to.have.members(['/', 'test/', 'test/test/', 'test/a/']);
  });

});

describe('newFolder', function(){
  before(function(done) {
    sinon
      .stub(dodgercms.s3, 'putObject')
      .yields(null, 'index');
    done();
  });

  after(function(done) {
    dodgercms.s3.putObject.restore();
    done();
  });

  it('should match the given key', function(done){
    dodgercms.utils.newFolder('index', 'dataBucket','siteBucket', function(err, key) {
      if (err) {
        return done(err);
      }
      chai.assert(key === 'index');
      done();
    });
  });
});