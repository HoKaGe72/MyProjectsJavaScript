document.addEventListener("DOMContentLoaded", function(){
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {   
            ev.target.classList.toggle('checked');            
        }
    }, false);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFooterVisibility);
    });
    creat_close();
    bindCloseButtons()
    updateFooterVisibility();
})

function add_todo(){
    var todo = document.createElement("li");
    let input_todo_value = document.getElementById("input_todo").value;
    todo.textContent = input_todo_value;
    if(input_todo_value===""){
        alert("Укажите задачу");
    } else{
        document.getElementById("todo").appendChild(todo);
    }
    document.getElementById("input_todo").value = "";

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', "checkbox")
    checkbox.setAttribute('style', "margin-right: 10px");
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    todo.appendChild(span);
    todo.prepend(checkbox)
    bindCloseButtons();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFooterVisibility);
    });
}

function creat_close(){
    var myNodelist = document.getElementsByTagName("li");
    for (let i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

function bindCloseButtons() {
    var closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            var li = this.parentElement;
            li.remove();
        }
    }
}

function updateFooterVisibility() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const main = document.getElementById('main');
    const footer = document.querySelector('footer');
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);            
    if (anyChecked) {
        footer.style.display = '';
        main.setAttribute('style',"margin-bottom:70px;");
    } else {
        setTimeout(() => {
            footer.style.display = 'none';
            main.removeAttribute('style'); 
        }, 1000);
    }
}

function allChecboxCheked(btn){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox=>{
        if(btn==="selectAll") {
            checkbox.checked=true;
        }else if(btn==="cancelSelect") {
            checkbox.checked=false;
            updateFooterVisibility();
        }else if(btn==="delete") {
            if (checkbox.checked) {
                checkbox.parentElement.remove();
                updateFooterVisibility();
            }
        }else{
            markCompleted();
            checkbox.checked=false;
            updateFooterVisibility();
        }
    })
}

function markCompleted() {
    const listItems = document.querySelectorAll('#todo li');
    listItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            item.classList.add('checked');
        }
    });
}