import $ from 'jquery'
import './app3.css'

const html = `
 <section id="app3">
      <div class="square"></div>
    </section>
`
const $element = $(html).appendTo($('body>.page'))
const $square = $('#app3 .square');
const localKey = 'app3.active';
  const active =localStorage.getItem(localKey) === 'yes';

$square.toggleClass('active',active);
//会根据第二个参数的true或false决定加不加第一个参数

$square.on('click', ()=>{
  if ($square.hasClass('active')){
    $square.removeClass('active');
    localStorage.setItem('app3.active','no')
  }else{
    $square.addClass('active');
    localStorage.setItem('app3.active','yes')
  }
});