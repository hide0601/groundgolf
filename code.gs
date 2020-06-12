function doPost(e) {  
  var param = e.parameter.param;
  
//メールアドレス認証後のGroundGolfメイン画面へ
if (param == 'gg_index'){
   var email = e.parameter.email;
   var name = e.parameter.name;
   var temp = HtmlService.createTemplateFromFile("GG_main_input.html");
   temp.name = name;
   temp.email = email;
   return temp.evaluate().setTitle('GrandGolf_GameInfo_Input').addMetaTag('viewport', 'width=device-width, initial-scale=1')
   .setFaviconUrl('https://drive.google.com/uc?id=1rvttJYokHuEnkGCEcwWWeOK7IEo3kVVc&.png');
;
}  
  
//★GroundGolf問い合わせ登録    
else if(param == 'ggqa'){
    var ssId = '1MNwt8lV_81EEwfU0m6Qb4tMuEv38RxGKF8qshhBBLy8';//GroundGolf_QAのファイル
    var ss = SpreadsheetApp.openById(ssId);
    var name = e.parameter.name;
    var email = e.parameter.email;
    var message = e.parameter.message;
    var date = GetNow();
    var sh = ss.getSheetByName('2020');
    var lastRow = sh.getLastRow();
    var new_qa = [[name,email,message,date]];
    console.log(new_qa);
    sh.getRange(lastRow+1,1,1,4).setValues(new_qa);
  
  //gmail送信
    var mail_title = 'GroundGolfClub問い合わせ：' + name;
    GmailApp.sendEmail('statsme.club@gmail.com',mail_title,message);
    console.log(mail_title);
  
    var temp = HtmlService.createTemplateFromFile("ggqa_result");
    return temp.evaluate().setTitle('問い合わせ完了').addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setFaviconUrl('https://drive.google.com/uc?id=1rvttJYokHuEnkGCEcwWWeOK7IEo3kVVc&.png');


 /*slack通知
    var text = '' + '_企業名：'+ new_company_name + '_担当者：' +new_person;
    const post_url = 'https://hooks.slack.com/services/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';
    const user_name = 'StatsMe';
    const send_data = {
        'username': user_name,
        'text': text
    };
    console.log(send_data);
    const options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(send_data)
    };
    console.log(options);
    UrlFetchApp.fetch(post_url, options)
    var temp = HtmlService.createTemplateFromFile("application_reslut");
    return temp.evaluate().setTitle('申込完了').addMetaTag('viewport', 'width=device-width, initial-scale=1');
*/
  
}//GroundGolf問い合わせ（param = ggqa)の終わり  

  
 //GrandGolf試合情報登録
 else if (param == 'gg_input'){
   var ssId = '1tuBaA_yE9fQgojqtp4Mzj-R0gvr0-4-6WjJZyeh6hX8';  //GroundGolf_Score_2020_01
   var ss = SpreadsheetApp.openById(ssId);
   var sh = ss.getSheetByName('gamemaster');
   var lastRow = sh.getLastRow();
   // 最古GameIDをgropumasterから取得
   var range = sh.getRange(lastRow,1,1,1);
   var gid = range.getValue();
   var newgid = gid + 1;   //新しいGameID（試合番号）を作成
     
   //シートをnewgidで追加
   var sheetname = String( newgid );
   var sheet = ss.insertSheet(sheetname);
          
   //日時を取得
   var date = GetNow();
     
   // GG_mail_inputのFormから試合情報を取得
   var gamename = e.parameter.gamename;
   var starthole = e.parameter.starthole;
   var coursename =e.parameter.coursename;
   var mem1 = e.parameter.mem1;
   var mem2 = e.parameter.mem2;
   var mem3 = e.parameter.mem3;
   var mem4 = e.parameter.mem4;
   var mem5 = e.parameter.mem5;
   var mem6 = e.parameter.mem6;
   var mem7 = e.parameter.mem7;
   var mem8 = e.parameter.mem8;
   var email = e.parameter.email;
   
   
   // gamemasterに試合情報を登録
   var gameinfo = [[newgid,date,email,gamename,starthole,coursename,mem1,mem2,mem3,mem4,mem5,mem6,mem7,mem8]];
   sh.getRange(lastRow+1, 1,1,14).setValues(gameinfo);
   
   //人数把握(mem_amount)のため、最終行の最終列を取得
   var lastRow = sh.getLastRow();   
   var mem_amount = sh.getRange(lastRow, 1).getNextDataCell(SpreadsheetApp.Direction.NEXT).getColumn();
   var mem_amount = Number(mem_amount);
   var mem_amount = mem_amount - 6;
   console.log('lastRow '+lastRow);
   console.log('人数 ' + mem_amount);
   
   var point_total_1 = '=sum(B6:B39)';
   var point_total_2 = '=sum(C6:C39)';
   var point_total_3 = '=sum(D6:D39)';
   var point_total_4 = '=sum(E6:E39)';
   var point_total_5 = '=sum(F6:F39)';
   var point_total_6 = '=sum(G6:G39)';
   var point_total_7 = '=sum(H6:H39)';
   var point_total_8 = '=sum(I6:I39)';
   
   var point_ave_1 = '=average(B6:B39)';
   var point_ave_2 = '=average(C6:C39)';
   var point_ave_3 = '=average(D6:D39)';
   var point_ave_4 = '=average(E6:E39)';
   var point_ave_5 = '=average(F6:F39)';
   var point_ave_6 = '=average(G6:G39)';
   var point_ave_7 = '=average(H6:H39)';
   var point_ave_8 = '=average(I6:I39)';
   
   var count_1_1 = '=countif(B6:B39,"1")';
   var count_1_2 = '=countif(C6:C39,"1")';
   var count_1_3 = '=countif(D6:D39,"1")';
   var count_1_4 = '=countif(E6:E39,"1")';
   var count_1_5 = '=countif(F6:F39,"1")';
   var count_1_6 = '=countif(G6:G39,"1")';
   var count_1_7 = '=countif(H6:H39,"1")';
   var count_1_8 = '=countif(I6:I39,"1")';
   
   var sh_gameinfo = [['Hole','選手1','選手2','選手3','選手4','選手5','選手6','選手7','選手8','','日時']];
   var sh =  ss.getSheetByName(sheetname);
   sh.getRange(1,1,1,11).setValues(sh_gameinfo);
   var sh_gameinint = [['Total',point_total_1,point_total_2,point_total_3,point_total_4,point_total_5,point_total_6,point_total_7,point_total_8]];
   sh.getRange(2,1,1,9).setValues(sh_gameinint);
   
   var sh_gameinint2 = [['Average',point_ave_1,point_ave_2,point_ave_3,point_ave_4,point_ave_5,point_ave_6,point_ave_7,point_ave_8]];
   sh.getRange(3,1,1,9).setValues(sh_gameinint2);
   
   var sh_gameinint3 = [['1打回数',count_1_1,count_1_2,count_1_3,count_1_4,count_1_5,count_1_6,count_1_7,count_1_8]];
   sh.getRange(4,1,1,9).setValues(sh_gameinint3);

   var sh_gameinint = [['0',mem1,mem2,mem3,mem4,mem5,mem6,mem7,mem8,'コース長','日時']];
   sh.getRange(5,1,1,11).setValues(sh_gameinint);
                       
   //gameid,player情報をindexへ
   var temp = HtmlService.createTemplateFromFile("GrandGolf_input");

     temp.gameid = newgid;
     temp.game_name = gamename;
     temp.com_ssId = '1tuBaA_yE9fQgojqtp4Mzj-R0gvr0-4-6WjJZyeh6hX8';
     temp.course_name = coursename;
     temp.player1 = mem1;
     temp.player2 = mem2;
     temp.player3 = mem3;
     temp.player4 = mem4;
     temp.player5 = mem5;
     temp.player6 = mem6;
     temp.player7 = mem7;
     temp.player8 = mem8;
     temp.com_ssId = ssId;
     temp.mem_amount = mem_amount;
     temp.starthole = starthole;
   
   return temp.evaluate().setTitle('GrandGolfInputStats!').addMetaTag('viewport', 'width=device-width, initial-scale=1')
   .setFaviconUrl('https://drive.google.com/uc?id=1rvttJYokHuEnkGCEcwWWeOK7IEo3kVVc&.png');
 }    
}//doPost終了


//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
//★★★★★★★★★★★★★　　関数群　　★★★★★★★★★★★★★★★★
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★



//●GGスコア記録
function GG_PointInput(sheetname,hole,h_len,sr1,sr2,sr3,sr4,sr5,sr6,sr7,sr8,men_amount){
  console.log('GGpoint_input');
  console.log('GGpoint_input'+sr8);
  var ssId = '1tuBaA_yE9fQgojqtp4Mzj-R0gvr0-4-6WjJZyeh6hX8';
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetname);
  var date = GetNow();
  var last_row = sh.getLastRow();
  
  switch(true){
    case (men_amount == 2):
　　　 sr3 = '';
      sr4 = '';
      sr5 = '';
      sr6 = '';
      sr7 = '';
      sr8 = ''
      break;
    case (men_amount == 3):
      sr4 = '';
      sr5 = '';
      sr6 = '';
      sr7 = '';
      sr8 = '';
      break;
    case (men_amount == 4):
      sr5 = '';
      sr6 = '';
      sr7 = '';
      sr8 = '';
      break;
    case (men_amount == 5):
      sr6 = '';
      sr7 = '';
      sr8 = '';
      break;
    case (men_amount == 6):
      sr7 = '';
      sr8 = '';
      break;
    case (men_amount == 7):
      sr8 = '';
      break;
  }
    
  console.log('hole '+hole);
  var last_score = [[hole,sr1,sr2,sr3,sr4,sr5,sr6,sr7,sr8,h_len,date]];
  console.log(last_score);
  sh.getRange(last_row+1, 1,1,11).setValues(last_score);
  var hole = Number(hole);
  console.log('hole2 ' + hole);  
  var hole = hole + 1;
  console.log('hole3 ' + hole);
  var last_row = sh.getLastRow();
  console.log('gginpute lastrow ' + last_row);
  if(last_row =='13'){
       console.log('ggpoint lastholw ');
    var hole = 0;
  }
  if(hole == '9'){
    var hole = 1;
  }
 console.log('hole '+hole);
  return hole;
}


//●GG最新スコア入手
function GG_latest_point(sheetname,ssId,mem_amount){
  Utilities.sleep(2000);//最新データが書き込まれるのWait（←本当はさけたい）
  var ssId = ssId;
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetname);
  var last_row = sh.getLastRow();
  var range = sh.getRange(2,2,1,mem_amount);
  var latest_score = range.getValues();
  console.log('GG_latest_point '+ latest_score);

  return latest_score;
}


//●シート最新情報削除
function undo_score(sheetName,ssId){
//  var ssId = '10-19IiogcPd5SdyP1_OU6tUXEob7V_OOOziKnbT0LSg';
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  var last_row = sh.getLastRow();
  sh.deleteRows(last_row);
  var last_row = sh.getLastRow();
  var range = sh.getRange(last_row,1,1,1);
  var hole = range.getValues();
  var hole = Number(hole);

  console.log('deleteのhole ' + hole);
  hole = hole + 1;
  return hole;  
}  

function latest_hole(sheetName,ssId){
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  var last_row = sh.getLastRow();
  var range = sh.getRange(last_row,1,1,1);
  var hole = range.getValues();
  var hole = Number(hole);
  console.log('GG_latest_hole ' + hole);
  return hole;
}







//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
//★★★★★★★★★★★★★　　未使用　テニス？　　★★★★★★★★★★★★★
//★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

//●GGTotalScore入手
function GG_point_stats(sheetname,ssId){
  Utilities.sleep(2000);//最新データが書き込まれるのWait（←本当はさけたい）
  var ssId = ssId;
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetname);
  var last_row = sh.getLastRow();
  var range = sh.getRange(last_row,2,1,5);
  var total_score = range.getValues();
  return total_score;
}



//★★★　ポイント処理　★★★※まず各値入手タイブレと通常の分岐
function PointInput(sheetName,st1,st2,point,sside,ssId) {
  var ssId = ssId;
  console.log('pointinput内ssId　'+ ssId);
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  var lastRow = sh.getLastRow();  
  var scoreAllRow = get_latest_score(sheetName,ssId);//最新の値を入手
  console.log('pointInput scoreAllRow'+scoreAllRow);
  var setno = scoreAllRow[0];
  var gameno = scoreAllRow[1];
  var server = scoreAllRow[2];
  var nextserver = scoreAllRow[3];
  var pointA = scoreAllRow[4];
  var pointB = scoreAllRow[5];
  var scoreA = scoreAllRow[6];
  var scoreB = scoreAllRow[7];
  var gameA = scoreAllRow[8];
  var gameB = scoreAllRow[9];
  var setA = scoreAllRow[10];
  var setB = scoreAllRow[11];
  var serve = scoreAllRow[12];
  var keep = scoreAllRow[14];
  var date = GetNow();  //日時
  var gameinfo = get_game_info(sheetName,ssId,2);//対象シートの1行目
  var tiebk_num = gameinfo[16];//セット数とタイブレーク有無を入手
  var set_num = gameinfo[17];
  var tie_break_jedge ="";
  
//一つの前のPlayがセット取得は初期化、6vs6はタイブレーク
  switch(true){
    case(gameA == 6 && gameB == 6):
      gameA = 6;
      gameB = 6;
      tie_break_jedge = 'T';
      break;
    case(gameA == 7)://一つ前のGAMEがタイグレーク決着
      gameA = 0;
      gameB = 0;
      scoreA = 0;
      scoreB = 0;
      break;
    case(gameB == 7)://一つ前のGAMEがタイグレーク決着
      gameA = 0;
      gameB = 0;
      scoreA = 0;
      scoreB = 0;
      break;
    case(gameA == 6 && gameB !=5):
      gameA = 0;
      gameB = 0;
      break;
    case(gameB == 6 && gameA !=5):
      gameA = 0;
      gameB = 0;
      break;
  }
 
//計算関数の分岐      
  if (tie_break_jedge == 'T'){
    console.log('tiebreakへ');
    var values = tiebreak_point(sheetName,setno,gameno,server,nextserver,pointA,pointB,scoreA,scoreB,gameA,gameB,
                                setA,setB,serve,keep,date,point,st1,st2,sh,lastRow,tiebk_num,set_num,sside,ssId);
    return values;  
  }
  else if(tie_break_jedge != 'T'){
    console.log('通常計算へ');
    var values = standard_point(sheetName,setno,gameno,server,nextserver,pointA,pointB,scoreA,scoreB,gameA,gameB,
                                setA,setB,serve,keep,date,point,st1,st2,sh,lastRow,tiebk_num,set_num,sside,ssId);
    return values;  
  }
  console.log('setA '+setA);
}

//★★★　ポイント処理（通常）　★★★
function standard_point(sheetName,setno,gameno,server,nextserver,pointA,pointB,scoreA,scoreB,gameA,gameB,setA,setB,
                        serve,keep,date,point,st1,st2,sh,lastRow,tiebk_num,set_num,sside,ssId){
  console.log('standard_point内gameno '+gameno);
//今回のサーブの情報
  var serve_sside = current_sside(pointA,pointB,serve,server,nextserver);
  var serve = serve_sside[0];
  var server = serve_sside[1];//表示用サーバー
  var keep = '-';
  
//もとのScoreから次のScoreを算出（IFされたPointによって関数使い分け’ー’はフォルト）  
  if(point == 'A'){
    var rscore_game = get_score(setno,gameno,server,nextserver,scoreA,scoreB,gameA,gameB,setA,setB,serve,keep,tiebk_num,set_num,point);
  }
  else if(point == 'B'){
    var rscore_game = get_score(setno,gameno,server,nextserver,scoreB,scoreA,gameB,gameA,setB,setA,serve,keep,tiebk_num,set_num,point);
    //scoreAをベースにしているので並び替え ★修正用
    console.log('Bpointの　' + rscore_game);
    var rscore_game=[rscore_game[0],rscore_game[1],rscore_game[2],rscore_game[4],rscore_game[3],rscore_game[6],rscore_game[5],rscore_game[8],rscore_game[7],rscore_game[9],rscore_game[10]];
  } 
  else if(point == '-'){
      var rscore_game=[setno,gameno,nextserver,scoreA,scoreB,gameA,gameB,setA,setB,serve,keep];
      }

  //次のセットNo.を計算
  if(rscore_game[7] == 'Win'){
    var next_setno = '-';
  }
  else if(rscore_game[8] == 'Win'){
    var next_setno = '-';
  }
  else{
    var next_setno= 1 + rscore_game[7] + rscore_game[8];
  } 
  
  //新しいスコアを作成して記録
  var keep = rscore_game[10];
  console.log('rscore_game内'+keep);
  //get_scoreの結果から、keep情報入手
  rscore_game.splice(0,1,next_setno);
  rscore_game.splice(2,0,server);//最新サーブ情報
  rscore_game.splice(4,0,st1,st2);//statsを追加
  rscore_game.splice(12,3,serve,point,keep,date);//最新サーブ情報
  console.log('rscore_game '+rscore_game);
  sh.getRange(lastRow+1,1,1,16).setValues([rscore_game]);

//最終行をindexに戻す  
  var values = get_latest_score(sheetName,ssId);//最新スコア入手
  console.log(values);
  return values;  
}



//★★★　スコア計算（通常）　★★★
function get_score(setno,gameno,server,nextserver,score,vs_score,game,vs_game,set,vs_set,serve,keep,tb,setnum,point){
  console.log('get_score内keep　'+keep);
  var keep = '-';
  var rscore = "";
  switch(true){
    case (score == 0):
　　　 rscore = 15;
　　　 break;
    case (score == 15):
　　　 rscore = 30;
　　　 break;
    case (score == 30):
　　　 rscore = 40;
　　　 break;
    case (score == 40 && vs_score == 40):
      rscore = 'A';
      break;
　　 case (score == 40 && vs_score == 'A'):
      rscore = 40;
      vs_score = 40;
      break;
    case (score == 'A' && vs_score == 40 ):
      var rgame_score = get_gamenum(gameno,game,vs_game,set,vs_set,setnum,point,server);
      game = rgame_score[0];
      vs_game = rgame_score[1];
      set = rgame_score[2];
      gameno = rgame_score[4];
      keep = rgame_score[5];
      vs_score = 0;
      rscore = 0;
      if (nextserver == 'A'){
        nextserver = 'B';
      }
      else{
        nextserver = 'A';
      }
      break;
    case (score == 40 && vs_score != 40):
      var rgame_score = get_gamenum(gameno,game,vs_game,set,vs_set,setnum,point,server);
      game = rgame_score[0];
      vs_game = rgame_score[1];
      set = rgame_score[2];
      gameno = rgame_score[4];
      keep = rgame_score[5];
      vs_score = 0;
      rscore = 0;
      if (nextserver == 'A'){
        nextserver = 'B';
      }
      else{
        nextserver = 'A';
      }
      break;
 }
 return [setno,gameno,nextserver,rscore,vs_score,game,vs_game,set,vs_set,serve,keep];
}

//★★★　通常のgame数計算　★★★
function get_gamenum(gameno,game,vs_game,set,vs_set,setnum,point,server){
  console.log('get_gamenum serer' + server);
  var rgame = "";
  var rgameno = "";
  
  //keep.break判断
  if(server == point){
    var keep = 'K';
  }
  else if(server != point){
    var keep = 'B';
  }
  else{
    var keep = '-'
  }  
    
  switch(true){
    case (game !=5 && vs_game != 6):
　　　 rgame = game+1;
      rgameno = gameno+1;
　　　 break;
    case (game ==5 && vs_game==5):
      rgame = game+1;
      rgameno = gameno+1;
      break;
    case (game ==5 && vs_game == 6):
　　　 rgame = game+1;
      rgameno = gameno+1;
      break;
    case (game ==5 && vs_game != 5):
　　　 rgame = game+1;
      rgameno = 1;
      var rset_game = get_setnum(game,vs_game,set,vs_set,setnum,point);      
      var set = rset_game[2];
　　　 break;
  }
  return [rgame,vs_game,set,vs_set,rgameno,keep];
}


//■■■　ポイント処理（タイブレーク）　■■■
function tiebreak_point(sheetName,setno,gameno,server,nextserver,pointA,pointB,scoreA,scoreB,gameA,gameB,setA,setB,serve,keep,date,point,st1,st2,sh,lastRow,tiebk_num,set_num,sside){
  var serve_sside = current_sside(pointA,pointB,serve,server,nextserver);
  var serve = serve_sside[0];
  var server = serve_sside[1];
  
  
  //もとのScoreから次のScoreを算出（IFされたPointによって関数使い分け’ー’はフォルト）  
  if(point == 'A'){
    console.log('pointAの処理');
    var rscore_game = get_tie_score(setno,gameno,server,nextserver,scoreA,scoreB,gameA,gameB,setA,setB,serve,keep,tiebk_num,set_num,point);
  }
  else if(point == 'B'){
    console.log('pointBの処理');
    var rscore_game = get_tie_score(setno,gameno,server,nextserver,scoreB,scoreA,gameB,gameA,setB,setA,serve,keep,tiebk_num,set_num,point);
    //scoreAをベースにしているので並び替え ★修正用
    console.log('Bpointの　' + rscore_game);
    var rscore_game=[rscore_game[0],rscore_game[1],rscore_game[2],rscore_game[4],rscore_game[3],rscore_game[6],rscore_game[5],rscore_game[8],rscore_game[7]];
  } 
  else if(point == '-'){
      var rscore_game=[setno,gameno,nextserver,scoreA,scoreB,gameA,gameB,setA,setB,serve];
      }

  //新しいスコアを作成して記録
  rscore_game.splice(2,0,server);//最新サーブ情報
  rscore_game.splice(4,0,st1,st2);//statsを追加
  rscore_game.splice(12,3,serve,point,keep,date);//最新サーブ情報
  sh.getRange(lastRow+1,1,1,16).setValues([rscore_game]);

//最終行をindexに戻す  
  var values = get_latest_score(sheetName);//最新スコア入手
  console.log(values);
  return values;  
}

//■■■　スコア計算（ダイブレーク）　■■■
function get_tie_score(setno,gameno,server,nextserver,score,vs_score,game,vs_game,set,vs_set,serve,keep,tb,setnum,point,ssId){
  var tiebreakpoint = tb;
  score = score+1;
  console.log('new_score ' +score);
  var scoreAll = score + vs_score;
  console.log('scoreAll ' + scoreAll);
  if(scoreAll == 1){
    var servejudge = 1;
    console.log('servejudge1 ' + servejudge);
  }else{
    var servejudge = scoreAll % 2;
  }
  console.log('servejudge2 ' + servejudge);
  var tiebreakpoint_gap = tiebreakpoint - score;
  var score_gap = score - vs_score;
  
  if(tiebreakpoint_gap <= 0){
    if(score_gap > 2){
      console.log('tiebreakでGAME');
      var game =7;
      var rset_game = get_setnum(game,vs_game,set,vs_set,setnum,point);
      var set = rset_game[2];
      gameno = gameno +1;
    }
  }
  var tie_break_next_server="";
  switch(true){
    case (score == 0 && vs_score == 0 && nextserver == 'A'):
      tie_break_next_server = 'B';
      break;
    case (score == 0 && vs_score == 0 && nextserver == 'B'):
      tie_break_next_server = 'A';
      break;
    case (servejudge == 1 && server == 'A'):
      tie_break_next_server = 'B';
      break;
    case (servejudge == 1 && server == 'B'):
      tie_break_next_server = 'A';
      break;
    case (servejudge == 0 && server == 'A'):
      tie_break_next_server = 'A';
      break;
    case (servejudge == 0 && server == 'B'):
      tie_break_next_server = 'B';
      break;      
  }
  var nextserver = tie_break_next_server;  
  return [setno,gameno,nextserver,score,vs_score,game,vs_game,set,vs_set,serve];
}

  


//●●共通関数●●
//●次のサーブがなにか？
function ServeSide(sheetName,sside,ssId) {
  Utilities.sleep(2000);//最新データが書き込まれるのWait（←本当はさけたい）
  var date = new Date();  //日時
  var scoreAll = get_latest_score(sheetName,ssId);//最新の値を入手
  var scoreAB = scoreAll[6]+scoreAll[7];//scoreAとBを合計
  var ss_sside =scoreAll[12];//今回のサーブ情報
  var server = scoreAll[2];//今回のサーバー情報
  var nextserver = scoreAll[3];//今回の次のサーバー情報
  var set_numA = scoreAll[10];//Aのセット情報
  var set_numB = scoreAll[11];//Bのセット情報
  var pointA = scoreAll[4];
  var pointB = scoreAll[5];
  console.log('ServeSie内　'+scoreAll);
  

  var gas_sside = "";
  switch(true){
    case (set_numA == 'Win'):
      gas_sside = "F";
      break;
    case (set_numB == 'Win'):
      gas_sside = "F";
      break;
    case (ss_sside == 'A1' && pointA == 'F'):
      gas_sside = 'A2';
      break;
    case (ss_sside == 'B1' && pointB == 'F'):
      gas_sside = 'B2'
      break;
/*    case (sside == 'A1'):
      gas_sside = 'A2';
      break;
    case (sside == 'B1'):
      gas_sside = 'B2';
      break;
*/
    case (server != nextserver):
      if (nextserver == 'A'){
        gas_sside = 'A1';
      }
      else{
        gas_sside = 'B1';
      }
      break;
    case (server == nextserver):
      if(server == 'A'){
        gas_sside = 'A1';
      }
      else{
        gas_sside = 'B1';
      }
      break;
  }
  return gas_sside;
}

  
//●pointのスタッツ提供用関数
function point_stats(sheetName,ssId){
  Utilities.sleep(2000);//最新データが書き込まれるのWait（←本当はさけたい）
  var p_stats = get_game_info(sheetName,ssId,2);
  console.log('point_stats内stats元データ'+p_stats);
  p_stats.splice(0,18);
  console.log('point_stats内stats加工データ'+p_stats);
  var stats_server = get_latest_score(sheetName,ssId);
  console.log('point_stats内Latestscore　'+stats_server);
  var stats_server = stats_server[3];
  console.log('point_stats内NextServer　'+stats_server);
  return [p_stats,stats_server];
}



//●シート情報全取得
function get_all_score(sheetName){
  var ssId = '10-19IiogcPd5SdyP1_OU6tUXEob7V_OOOziKnbT0LSg';
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  var last_row = sh.getLastRow();
  var range = sh.getRange(1,1,last_row,13);
  var values = range.getValues();
  return values;
}

//●シート最新情報取得
function get_latest_score(sheetName,ssId){
  var ssId = ssId;
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  console.log('getlatest sh '+sh);
  var last_row = sh.getLastRow();
  var range = sh.getRange(last_row,1,1,15);
  var values = range.getValues();
  var values = values[0];
  return values;
}

//●シート指定行(col)取得（22列まで）
function get_game_info(sheetName,ssId,col){
  var ssId = ssId;
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  var last_row = sh.getLastRow();
  var range = sh.getRange(col,1,1,22);
  var values = range.getValues();
  var values = values[0];
  return values;
}


//●今回のサーブとサーバー情報入手
function current_sside(pointA,pointB,serve,server,nextserver){
  var input_sside = "";
  switch(true){
    case (pointA == 'F' && serve == 'A1'):
      input_sside = 'A2';
      server = 'A';
      break;
    case (pointB == 'F' && serve == 'B1'):
      input_sside = 'B2';
      server = 'B';
      break;
    case (server != nextserver):
      if (nextserver == 'A'){
        input_sside = 'A1';
        server = 'A';
      }
      else{
        input_sside = 'B1';
        server = 'B';
        console.log('sside '+input_sside);
        console.log('sside '+server);
      }
      break;
    case (server == nextserver):
      if(server == 'A'){
        input_sside = 'A1';
        server = 'A'
      }
      else{
        input_sside = 'B1';
        server = 'B';
      }
    break;
  }
  var value = input_sside;
  
  return [value,server];
}

//●Tennisセット数の計算
function get_setnum(game,vs_game,set,vs_set,setnum,point){
  console.log('set '+set);
  console.log('set_num '+setnum);
  if(setnum == 3){
    var set_remain = setnum - set -1;
    console.log('get_setnum '+set_remain);
  }
  else if(setnum == 5){
    var set_remain = setnum - set -2;
  }
    

  var rset = "";
  switch(true){
    case (set_remain == 1):
　　　 rset = 'Win';
      break;
    case (set_remain != 1):
　　　 rset = set + 1;
      break;
  }
  return [game,vs_game,rset,vs_set];
  //set = set +1;
  //return [set];
}



//●対象シートのcsvダウンロード用URL取得
function getCSV(sheetname,ssId) {
  var ssId = ssId;
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetname);
  var url_all = ss.getUrl();
  var url = url_all.slice( 0, -4) ;
  var page_id = sh.getSheetId();  
  var SheetURL = url + "export?format=csv&gid="+ page_id;   
  return SheetURL;
}

//●日時分秒取得
function GetNow() {
  var d = new Date();
  var y = d.getFullYear();
  var mon = d.getMonth() + 1;
  var d2 = d.getDate();
  var h = d.getHours();
  var min = d.getMinutes();
  var s = d.getSeconds();
  var now = y+"/"+mon+"/"+d2+" "+h+":"+min+":"+s;
  return now;
}

//●Get Tennis Stats
function GetTennisStats(sheetName,ssId,setnum) {
  Utilities.sleep(4000);//最新データが書き込まれるのWait（←本当はさけたい）
  var ssId = ssId;
  var ss = SpreadsheetApp.openById(ssId);
  var sh = ss.getSheetByName(sheetName);
  var range = sh.getRange(2,19,1,16);
  var values = range.getValues();
  var values = values[0];
  //最新スコアの入手
  var last_score = get_latest_score(sheetName,ssId);
  //最終セット数の入手
  var last_set_numA = last_score[10];
  if(last_set_numA == 'Win'){
    last_set_numA = setnum;
  }
  var last_set_numB = last_score[11];
  if(last_set_numB == 'Win'){
    last_set_numB = setnum;
  }

  //最終セットを文字列に追加
  values.push(last_set_numA);
  values.push(last_set_numB);
  return values;  
}


