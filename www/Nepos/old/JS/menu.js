const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');

menu.addEventListener('click', () => {
    if(!bar1.classList.contains('animated-button1')){
        bar1.classList.remove('unanimated-button1');
        bar2.classList.remove('unanimated-button2');
        bar3.classList.remove('unanimated-button3');
        bar1.classList.add('animated-button1');
        bar2.classList.add('animated-button2');
        bar3.classList.add('animated-button3');
    }
    else{
        bar1.classList.remove('animated-button1');
        bar2.classList.remove('animated-button2');
        bar3.classList.remove('animated-button3');
        bar1.classList.add('unanimated-button1');
        bar2.classList.add('unanimated-button2');
        bar3.classList.add('unanimated-button3');
    }
    
  });

