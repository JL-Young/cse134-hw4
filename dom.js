/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('advAddBtn');
    element.addEventListener('click', function () {
        advAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRmvBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('selectRmvBtn');
    element.addEventListener('click', function () {
        selectiveRemove();
    });

    element = document.getElementById('cloneBtn');
    element.addEventListener('click', function () {
        clone();
    });
    
    element = document.getElementById('advCloneBtn');
    element.addEventListener('click', function () {
        advClone();
    });
}

function walk() {
    let el;

    el = document.getElementById('p1');
    showNode(el);
 
    el = el.firstChild;
    showNode(el);

    el = el.nextSibling;
    showNode(el);

    el = el.lastChild;
    showNode(el);

    el = el.parentNode.parentNode.parentNode;
    showNode(el);

    el = el.querySelector('section > *');
    showNode(el);

}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    document.getElementById('travTxt').append(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`);
}

function advWalk() {
    let rootNode = document.documentElement;
    let domTree = advWalkHelper(rootNode);
    document.getElementById('travTxt').value = domTree;
}

function advWalkHelper(rootNode) {
    const treeWalker = document.createTreeWalker(rootNode);

    let domTree = '';
    let curNode = treeWalker.currentNode;
    let depth = 0;

    while (curNode) {
        const indent = '|   '.repeat(depth);
        domTree += `${indent}|-- ${curNode.nodeName}\n`;

        if (curNode.firstChild) {
            depth++;
            treeWalker.currentNode = curNode.firstChild;
        } else if (curNode.nextSibling) {
            treeWalker.currentNode = curNode.nextSibling;
        } else {
            let prntNode = curNode.parentNode;
            while (prntNode && !prntNode.nextSibling) {
                depth--;
                prntNode = parent.parentNode;
            }

            if (!prntNode) {
                break;
            }

            depth--;
            treeWalker.currentNode = prntNode.nextSibling;
        }

        curNode = treeWalker.currentNode;
    }

    return domTree;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify(){
    let el = document.getElementsByTagName('h1')[0];
    let num = Math.ceil(Math.random() * 6);
    el.textContent = 'DOM Manipulation is Fun!';
    el.style.color = 'var(--darkcolor' + num + ')';

    let tagElems = document.getElementsByTagName('p');
    for (var i=0; i < tagElems.length; i++) {
        tagElems[i].classList.toggle('shmancy');;
    }

}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advAdd() {
    let elemType = document.getElementById('elemSelect').value;
    let elemCont = document.getElementById('elemCont').value;

    let printCont = `This is a new ${elemType} ` + Date().toLocaleString();
    let newElem;
    
    if (elemCont.length != 0) {
        printCont = elemCont;
    }

    switch (elemType) {
        case 'Text Node':
            newElem = document.createElement('p');
            newElem.textContent = printCont;
            document.getElementById('addField').appendChild(newElem);
            document.getElementById('addField').lastElementChild.classList.add('output');
            break;
        case 'Comment':
            newElem = document.createComment(printCont);
            document.getElementById('addField').appendChild(newElem);
            break;
        case 'Element':
            let tagType = document.getElementById('tagType').value;
            newElem = document.createElement(tagType);
            newElem.textContent = printCont;
            document.getElementById('addField').appendChild(newElem);
            document.getElementById('addField').lastElementChild.classList.add('output');
            break;
    }
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
    let cur = document.body.lastElementChild;

    if (cur.id === 'controls') {
        cur = cur.previousSibling;
    }
    console.log(cur);
    document.body.removeChild(cur);
}

function selectiveRemove() {
    let selectCSS = document.getElementById('selectCSS').value;
    document.querySelectorAll(`${selectCSS}`).forEach(e => e.remove());
}

function clone() {
    var p1Elem = document.getElementById('p1');
    var clone = p1Elem.cloneNode(true);
    console.log(clone);
    document.getElementById('cloneField').appendChild(clone);
}

function advClone() {
    const cardTemplate = document.getElementById('cardTemplate');
    const cardClone = cardTemplate.content.cloneNode(true);
    
    const titleElem = cardClone.querySelector('h3');
    titleElem.textContent = randTitle();

    const txtElem = cardClone.querySelector('p');
    txtElem.textContent = randTxt();

    const imgElem = cardClone.querySelector('img');
    imgSelect = randImg();
    imgElem.src = imgSelect.url;
    imgElem.alt = imgSelect.alt;

    const linkElem = cardClone.querySelector('a');
    linkElem.innerText = 'Image Sources';
    linkElem.href = 'https://unsplash.com/s/photos/ucsd';

    document.body.appendChild(cardClone);
}

function randTitle() {
    const titles = [
        'Architecture',
        'Landmark',
        'Art',
        'Fiat Lux',
    ];
    return titles[Math.floor(Math.random() * titles.length)];
}

function randTxt() {
    const txts = [
        'Lorem ipsum dolor sit amet...',
        'Purpose, Truth, and Vision.',
        'Culture, Art, and Technology.',
        'Toward a Life in Balance.',
    ];
    return txts[Math.floor(Math.random() * txts.length)];
}

function randImg() {
    const imgs = [
        {
            url: './files/bomin-xie-kOrX221ewNg-unsplash.jpg',
            alt: 'Image of UCSD building by Bomin Xie'
        },
        {
            url: './files/jeremy-huang-_h8FSA9soGU-unsplash.jpg',
            alt: 'Image of Warren Bear by Jeremy Huang'
        },
        {
            url: './files/jessica-tan-5SsvBkT7b7Q-unsplash.jpg',
            alt: 'Image of the Fallen Star by Jessica Tan'
        }
    ]
    return imgs[Math.floor(Math.random() * imgs.length)];
}


window.addEventListener('DOMContentLoaded', init);