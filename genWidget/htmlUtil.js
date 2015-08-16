/**
@param title is current sub page title
@return
    <div id="header">
        <a onClick="javascript:history.go(-1)">
          <i class="fa fa-chevron-left fa-left"/>
        </a>
        <a href="#" onclick="UbiCallManager.goToHomeScreen()">
          <i class="fa fa-home fa-right"/>
        </a>
        <h3> @param title </h3>
    </div>';
**/
function setTitle($, title) {
  var $header = $('<div/>').attr('id', 'header');

  var $a_back = $('<a/>').attr('onclick', 'javascript:history.go(-1)');
  var $a_back_i = $('<i/>').attr('class', 'fa fa-chevron-left fa-left');

  var $a_home = $('<a/>').attr('href', '#').attr('onclick', 'UbiCallManager.goToHomeScreen()');
  var $a_home_i = $('<i/>').attr('class', 'fa fa-home fa-right');

  var $title = $('<h3/>').text(title);

  $a_back.append($a_back_i);
  $a_home.append($a_home_i);

  $header.append($a_back);
  $header.append($a_home);
  $header.append($title);

  return $header;
}

/**
@param $ is cheerio documnet
@return
    <div id = "search" >
      <div id = "imaginary_container" >
        <div class = "input-group stylish-input-group" >
          <input class = "form-control" placeholder = "Search" type = "text" > < /div>
          <span class = "input-group-addon" >
            <button type = "submit" >
              <span class = "fa fa-search" > < /span>
              </button>
          </span>
        </div>
      </div>
    </div>
**/
function _search($) {

  var $search = $('<div/>').attr('id', 'search');
  var $div_container = $('<div/>').attr('id', 'imaginary_container');

  var $div_input_group = $('<div/>').attr('class', 'input-group stylish-input-group');

  var $input = $('<input/>').attr('class', 'form-control').attr('placeholder', 'Search').attr('type', 'text');
  var $search_span = $('<span/>').attr('class', 'input-group-addon');

  var $search_button = $('<button/>').attr('type', 'submit');
  var $search_button_icon = $('<span/>').attr('class', 'fa fa-search');

  $search_button.append($search_button_icon);
  $search_span.append($search_button);

  $div_input_group.append($input);
  $div_input_group.append($search_span);

  $div_container.append($div_input_group);
  $search.append($div_container);

  return $search;
}

/**
@param $ is cheerio documnet
@param choices [{ ScreenName, ChoiceText , url},{ ScreenName, ChoiceText , url}]
@return
      <div class="list-group">
        <a target="_blank" data-toggle="collapse" class="list-group-item lest-01"  href="http://www.fedex.com/">Track Your Order</a>
        <a data-toggle="collapse" class="list-group-item lest-01" href="eeeba174.b1edc.html">Returns &amp; Exchange</a>
      </div>
**/
function createChoices($, pageId, choices, title) {

  var header = setTitle($, title);
  var search = _search($);

  var $divlist = $('<div/>').attr('class', 'list-group');
  choices.forEach(function(choice) {

    var $a = $('<a/>').attr('class', 'list-group-item lest-01').text(choice.ChoiceText);
    if (choice.url) {
      $a.attr('href', choice.url).attr('target', '_blank');
    } else {
      $a.attr('href', '#' + choice.ScreenName);
    }
    $divlist.append($a);
  });
  var $divpages = $('<div/>').attr('class', 'pages');
  var $content = $('<div/>').attr('data-role', 'content');
  var $page = $('<div/>').attr('data-role', 'page').attr('id', pageId);

  $divpages.append($divlist);
  $content.append(header);
  $content.append(search);
  $content.append($divpages);
  $page.append($content);
  $('body').prepend($page);
  return $
}

/**
  @param $ is cheerio documnet
  @param grids is [{ScreenName, url, UrlImage ,ChoiceText} , {ScreenName, url, UrlImage ,ChoiceText}]
  @return
      <ul class="grid-01">
         <li>
           <a href="e00b2cb8.70e9f8.html" class="animsition-link">
             <img src="https://designer.ubicall.com/uploads/fdab76ef5814558d0e5fae788d9a7bd1.png" height="50" width="50">
              Shipping & Returns
          </a>
         </li>
         <li>
           <a href="df63be64.823108.html" class="animsition-link">
             <img src="https://designer.ubicall.com/uploads/509deebc910aee6633a8d7f6d0e33358.png" height="50" width="50">
             FAQ's
          </a>
         </li>
       </ul>
 **/
function createGrid($, pageId, grids, title) {
  var header = setTitle($, title);
  var search = _search($);


  var $ul = $('<ul/>').attr('class', 'grid-01')
  grids.forEach(function(grid) {
    var $li = $('<li/>');
    var $a = $('<a/>');
    if (grid.url) {
      $a.attr('href', grid.url).attr('target', '_blank');
    } else {
      $a.attr('href', '#' + grid.ScreenName).attr('class', 'animsition-link');
    }

    var $img = $('<img/>').attr('src', grid.UrlImage).attr('height', 50).attr('width', 50);
    $a.append($img).append(grid.ChoiceText);
    $li.append($a);
    $ul.append($li);
  });

  var $divpages = $('<div/>').attr('class', 'pages');
  var $content = $('<div/>').attr('data-role', 'content');
  var $page = $('<div/>').attr('data-role', 'page').attr('id', pageId);

  $divpages.append($ul);
  $content.append(header);
  $content.append(search);
  $content.append($divpages);
  $page.append($content);

  $('body').prepend($page);
  return $

}

/**
  @param $ is form documnet
  @param formFields [{FieldLabel, Placeholder, isMandatory ,FieldType,Keyboard} , {FieldLabel, Placeholder, isMandatory ,FieldType,Keyboard}]
  @param queue where to submit this form data
  @param FormTitle 'what this form about'
  @return
    <div>
        <p>@param FormTitle</p>
        <form action="" method="post" onsubmit="submitCallForm();return false;">
            <div class="form-group">
                <label>Gender</label>
                <select class="form-control" name="Gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <input type="hidden" id="qid" value="@param queue">
        <script src="https://platform.ubicall.com/widget/scriptform.js"></script>
    </div>
 **/
function createForm($, pageId, formFields, queue, FormTitle, title) {

  var header = setTitle($, title);
  var search = _search($);

  var $maidiv = $('<div/>').attr('class', 'pages');

  var $p = $('<p/>').text(FormTitle);
  var $form = $('<form/>').attr('method', 'post').attr('action', '').attr('onsubmit', 'submitCallForm();return false;');
  formFields.forEach(function(field) {

    var $div = $('<div/>').attr('class', 'form-group');
    var $label = $('<label/>').text(field.FieldLabel);

    var $input = $('<input/>').attr('class', 'form-control').attr('placeholder', field.Placeholder).attr('name', field.FieldLabel);

    if (field.isMandatory == true) {
      $input.attr('required', 'required');
    }
    if (field.FieldType == 'Date') {
      $input.attr('type', 'date');
    } else if (field.FieldType == 'Selector') {
      $input = $('<select/>').attr('class', 'form-control').attr('name', field.FieldLabel);
      field.Values.forEach(function(op) {
        $option = $('<option/>').text(op).val(op);
        $input.append($option);
      });
    } else {
      if (field.Keyboard == '0') {
        $input.attr('type', 'number');
      } else {
        $input.attr('type', 'text');
      }
    }
    $div.append($label);
    $div.append($input);
    $form.append($div);

  });

  var $Hinput = $('<input/>').attr('type', 'hidden').attr('id', 'qid').val(queue);
  var $button = $('<button/>').attr('type', 'submit').attr('class', 'btn btn-default').text('Submit');
  $form.append($Hinput);
  $form.append($button);
  $maidiv.append($p);
  $maidiv.append($form);



  var $content = $('<div/>').attr('data-role', 'content');
  var $page = $('<div/>').attr('data-role', 'page').attr('id', pageId);

  $content.append(header);
  $content.append(search);
  $content.append($maidiv);
  $page.append($content);

  $('body').prepend($page);
  return $

}





/**
@param $ is cheerio documnet
@param content ' content for info screen '
@return
  <p> @param content</p>
**/
function createInfo($, pageId, content, title) {

  var header = setTitle($, title);
  var search = _search($);

  var $p = $('<p/>').text(content);


  var $divpages = $('<div/>').attr('class', 'pages');
  var $content = $('<div/>').attr('data-role', 'content');
  var $page = $('<div/>').attr('data-role', 'page').attr('id', pageId);

  $divpages.append($p);
  $content.append(header);
  $content.append(search);
  $content.append($divpages);
  $page.append($content);
  $('body').prepend($page);
  return $
}

/**
@param $ is cheerio documnet
@param queue queue id
@return
  <div>
    <button onclick="UbiCallManager.scheduleSipCall(@param queue)" class="btn btn-default">Receive web VoIP call</button>
    <button onclick="UbiCallManager.setPhoneCallQueue(@param queue)" class="btn btn-default">Receive a call on Cell phone</button>
  </div>
**/

function createCall($, pageId, queue, title) {

  var header = setTitle($, title);
  var search = _search($);

  var $div = $('<div/>');

  var $buttona = $('<button/>').attr('class', 'btn btn-default').text('Receive web VoIP call')
    .attr('onclick', 'this.disabled=true;UbiCallManager.scheduleSipCall(' + queue + ')');

  var $buttonb = $('<button/>').attr('class', 'btn btn-default').text('Receive a call on Cell phone')
    .attr('onclick', 'this.disabled=true;UbiCallManager.setPhoneCallQueue(' + queue + ')');


  $div.append($buttona);
  $div.append($buttonb);

  var $divpages = $('<div/>').attr('class', 'pages');
  var $content = $('<div/>').attr('data-role', 'content');
  var $page = $('<div/>').attr('data-role', 'page').attr('id', pageId);

  $divpages.append($div);
  $content.append(header);
  $content.append(search);
  $content.append($divpages);
  $page.append($content);

  $('body').prepend($page);
  return $
}



module.exports = {

  createGrid: createGrid,
  createChoices: createChoices,
  createInfo: createInfo,
  createCall: createCall,
  createForm: createForm
}
