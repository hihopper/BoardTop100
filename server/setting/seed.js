'use strict'

var Board = require('../api/board/board.model');


var express = require('express');

var router = express.Router();
router.get('/',  function( req, res ) {

  global.logger.info('--------------- seed DB ---------------');
  Board.find({}).remove( function(){
    Board.create( {no: 1, site: '', title: '데드풀 VS 데드풀', href:'http://www.todayhumor.co.kr/board/view.php?table=humorbest&amp;no=1206165&amp;s_no=1206165', writer: 'cv'});
    Board.create( {no: 10, site: '', title: '입이 크다는 나인뮤지스의 경리.jpg', href:'http://www.ddanzi.com/index.php?mid=free&amp;document_srl=75447238', writer: 'cv'});
    Board.create( {no: 3, site: '', title: '성남시가 또 일 냈네요.', href:'http://www.ppomppu.co.kr/zboard/view.php?id=freeboard&amp;no=4600782', writer: 'cv'});
    Board.create( {no: 4, site: '', title: '가터벨트 착용 샷..', href:'http://www.todayhumor.co.kr/board/view.php?table=humorbest&amp;no=1206158&amp;s_no=1206158', writer: 'cv'});
  });

  return res.status(200).json({
  });
});

module.exports = router;
