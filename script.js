const LOADER_TIME = 2000;
let root = undefined;

let maxZIndex = 101;

const str_partition = (str, sep) => {
    let idx = str.indexOf(sep);
    return [str.slice(0, idx), str.slice(idx + 1)];
};

const ABOUT_ME = `
<h1>About Me</h1>
<p>
    Hi, I'm Shrehan and I'm a student at Indian Institute of Technology, Kharagpur.
    <br><br>
    I'm currently pursuing a B.Tech in Civil Engineering.
    <br><br>
    I'm a boarder at Lal Bahadur Shastri Hall of Residence.
    <br><br>
    I'm a self-taught programmer and I love to code!
</p>
`;

const PORTFOLIO = `
<h1>Portfolio</h1>
<p>
    <h3>Projects</h3>
    <ul>
        <li>
            <h4>Sunflower (under development)</h4>
            <p>
            My own Turing complete programming language. <br>
            Supports basic arithmetic operations, loops, conditionals, functions, classes and more! <br>
            <a href="https://github.com/shrehanrajsingh/csunflower" target='_blank'>Check it out!</a>
            (Also check the test programs in the 'tests' folder!)
            </p>
        </li>
        <li>
            <h4>Sonnet</h4>
            <p>
            A social networking website. <br>
            Built using PHP, MySQL and Bootstrap. <br>
            <a href="http://sonnet.infinityfreeapp.com" target='_blank'>Check it out!</a>
            (Also send me a friend request at @shrehanrajsingh!)
            </p>
        </li>
    </ul>
</p>
`;

const CONTACT_ME = `
<h1>Contact Me</h1>
<p>
    <h3>Email</h3>
    <ul>
        <li>shrehanofficial@gmail.com</li>
        <li>shrehanrajsingh.24@kgpian.iitkgp.ac.in</li>
    </ul>
    <h3>Phone</h3>
    <ul>
        <li>+91 9475005020</li>
    </ul>
    <h3>Social Media</h3>
    <ul>
        <li><a href="https://www.linkedin.com/in/shrehanrajsingh" target='_blank'>LinkedIn</a></li>
        <li><a href="https://github.com/shrehanrajsingh" target='_blank'>GitHub</a></li>
        <li><a href="https://www.instagram.com/shrehanrajsingh" target='_blank'>Instagram</a></li>
    </ul>
</p>
`;

const README = `
Introduction
------------
Welcome to the ShreOS! This is a simple operating system simulation built using HTML, CSS and JavaScript. It is a project by me!
This is my submission for Student Welfare Group's Tech team.
I hope you like it!

Features
--------
1. You can move windows around.
2. You can maximize windows.
3. Topbar and taskbar are currently for illustrative purposes only.
4. You can create new files.
5. Add user functionality is for illustrative purposes only.
`;

const open_app = type => {
    return e => {
        // if (type == 'aid') {
        //     let target = e.target;
        //     console.log(target);

        //     /* check if target is div */
        //     while (target.tagName !== 'LI') {
        //         target = target.parentElement;
        //     }

        //     let appWindow = document.createElement('div');
        //     appWindow.className = 'app-window';
        //     appWindow.style.left = '50px';
        //     appWindow.style.top = '50px';
        //     appWindow.style.zIndex = maxZIndex++;

        //     appWindow.style.animation = 'popIn 0.25s';

        //     let appTitle = document.createElement('div');
        //     appTitle.className = 'aw-titlebar';
        //     appTitle.innerHTML = `<h5>${target.innerHTML}</h5>`;
        //     appWindow.appendChild(appTitle);

        //     let appContents = document.createElement('div');
        //     appContents.className = 'app-contents';

        //     appContents.innerHTML = `<div class='app-devcont'>
        //     <h1>App in Development</h1>
        //     <p>Sorry, this app is still in development. Please check back later.</
        //     </div>`;
        //     appWindow.appendChild(appContents);
        //     document.body.appendChild(appWindow);

        //     state_update();


        //     return;
        // }

        let target = e.target;

        while (target.className != 'app') {
            if (target.tagName === 'LI') {
                break;
            }
            target = target.parentElement;
        }

        let file = target.getAttribute('data-file');
        let fileObj = JSON.parse(root['root'][window.localStorage.getItem('loginname')]['Desktop'][file]);

        let appWindow = document.createElement('div');
        appWindow.className = 'app-window';
        appWindow.style.left = '50px';
        appWindow.style.top = '50px';
        appWindow.style.zIndex = maxZIndex++;

        appWindow.style.animation = 'popIn 0.25s';

        let appTitle = document.createElement('div');
        appTitle.className = 'aw-titlebar';
        appTitle.innerHTML = `<h5>${fileObj['name']}.${fileObj['type']}</h5>`;
        appWindow.appendChild(appTitle);

        let appContents = document.createElement('div');
        appContents.className = 'app-contents';

        let ul = document.createElement('ul');
        ul.className = 'aw-tb-icons';

        let li1 = document.createElement('li');
        li1.classList.add('btn-close');

        li1.onclick = () => {
            appWindow.remove();
        }

        let li2 = document.createElement('li');
        li2.classList.add('btn-max');

        let li3 = document.createElement('li');
        li3.classList.add('btn-min');

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);

        appTitle.appendChild(ul);

        if (fileObj['type'] === 'txt') {
            appContents.innerHTML = `<textarea class="app-textarea">${fileObj['contents']}</textarea>`;
            let saveBtn = document.createElement('button');
            saveBtn.className = 'btn-save';
            saveBtn.innerHTML = 'Save';
            saveBtn.onclick = () => {
                fileObj['contents'] = appContents.querySelector('.app-textarea').value;
                root['root'][window.localStorage.getItem('loginname')]['Desktop'][file] = JSON.stringify(fileObj);
                update_ls(root);

                let title = appWindow.querySelector('.aw-titlebar h5');
                if (title.innerHTML.endsWith('*')) {
                    title.innerHTML = title.innerHTML.substring(0, title.innerHTML.length - 1);
                }
            };

            appContents.appendChild(saveBtn);

            let saveAsBtn = document.createElement('button');
            saveAsBtn.className = 'btn-saveas';
            saveAsBtn.innerHTML = 'Save As';
            saveAsBtn.onclick = () => {
                let newFile = prompt('Enter new file name');
                let newFileContents = appContents.querySelector('.app-textarea').value;

                if (newFile !== null && newFile !== '') {
                    add_file(newFile, `root/${window.localStorage.getItem('loginname')}/Desktop/${str_partition(newFile)[0]}`, JSON.stringify(
                        {
                            'name': newFile.substring(0, newFile.lastIndexOf('.')),
                            'contents': newFileContents,
                            'type': newFile.substring(newFile.lastIndexOf('.') + 1),
                            'pos': {
                                'x': 50,
                                'y': 50
                            }
                        }
                    ));

                    let desktop = root['root'][window.localStorage.getItem('loginname')]['Desktop'];
                    let fileObj = JSON.parse(desktop[file]);
                    let fileDiv = document.createElement('div');
                    fileDiv.className = 'app';

                    fileDiv.onclick = open_app(fileObj['type']);

                    fileDiv.setAttribute('data-file', file);

                    let appIcon = document.createElement('div');
                    appIcon.className = 'app-image';

                    if (fileObj['type'] === 'txt') {
                        appIcon.innerHTML = '<center><img src="assets/file.png" /></center>';
                    } else if (fileObj['type'] === 'folder') {
                        appIcon.innerHTML = '<center><img src="assets/folder.png" /></center>';
                    } else if (fileObj['type'] === 'html') {
                        appIcon.innerHTML = '<center><img src="assets/html.png" /></center>';
                    }

                    fileDiv.appendChild(appIcon);

                    let appTitle = document.createElement('div');
                    appTitle.className = 'app-title';
                    appTitle.innerHTML = `${newFile}`;
                    fileDiv.appendChild(appTitle);

                    document.querySelector('#desk').appendChild(fileDiv);
                }
            };

            appContents.appendChild(saveAsBtn);
            appContents.appendChild(document.createElement('br'));

            appContents.querySelector('.app-textarea').onkeydown = e => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    let ta = e.target;
                    let start = ta.selectionStart;
                    let end = ta.selectionEnd;

                    ta.value = ta.value.substring(0, start) + '\t' + ta.value.substring(end);
                    ta.selectionStart = ta.selectionEnd = start + 1;
                }

                let title = appWindow.querySelector('.aw-titlebar h5');
                if (!title.innerHTML.endsWith('*')) {
                    title.innerHTML += '*';
                }
            }

        }
        else if (fileObj['type'] === 'html') {
            appContents.innerHTML = fileObj['contents'];
        }

        appWindow.appendChild(appContents);
        document.body.appendChild(appWindow);

        if (type == 'txt') {
            appContents.querySelector('.app-textarea').style.height = `${appWindow.clientHeight * 0.7}px`;
            appWindow.click();
        }

        state_update();
    }
};

const open_app_aid = e => {
    let target = e.target;
    console.log(target);

    while (target.tagName !== 'LI') {
        target = target.parentElement;
    }

    let appWindow = document.createElement('div');
    appWindow.className = 'app-window';
    appWindow.style.left = '50px';
    appWindow.style.top = '50px';
    appWindow.style.zIndex = maxZIndex++;

    appWindow.style.animation = 'popIn 0.25s';

    let appTitle = document.createElement('div');
    appTitle.className = 'aw-titlebar';
    appTitle.innerHTML = `<h5>${target.innerHTML}</h5>`;
    appWindow.appendChild(appTitle);

    let appContents = document.createElement('div');
    appContents.className = 'app-contents';

    let ul = document.createElement('ul');
    ul.className = 'aw-tb-icons';

    let li1 = document.createElement('li');
    li1.classList.add('btn-close');

    li1.onclick = () => {
        appWindow.remove();
    }

    let li2 = document.createElement('li');
    li2.classList.add('btn-max');

    let li3 = document.createElement('li');
    li3.classList.add('btn-min');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    appTitle.appendChild(ul);

    appContents.innerHTML = `<div class='app-devcont'>
    <h1>App in Development</h1>
    <p>Sorry, this app is still in development. Please check back later.</
    </div>`;
    appWindow.appendChild(appContents);
    document.body.appendChild(appWindow);

    state_update();
};

const state_update = () => {
    let aws = document.querySelectorAll('.app-window');

    aws.forEach(aw => {
        aw.querySelector('.aw-titlebar').onmousedown = e => {
            let target = e.target;

            while (target.className !== 'app-window') {
                target = target.parentElement;
            }

            // target.style.zIndex = 999;

            let z = 0;
            let x = 0;
            let y = 0;

            // target.style.zIndex = z;

            target.onmousedown = e => {
                x = e.clientX - target.getBoundingClientRect().left;
                y = e.clientY - target.getBoundingClientRect().top;

                target.style.zIndex = maxZIndex;

                document.onmousemove = e => {
                    target.style.left = `${e.clientX - x}px`;
                    target.style.top = `${e.clientY - y}px`;
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        };

        aw.onclick = e => {
            let target = e.target;

            while (target.className !== 'app-window') {
                target = target.parentElement;
            }

            let z = maxZIndex++;

            target.style.zIndex = z;
        };

        let maxBtn = aw.querySelector('.btn-max');
        let minBtn = aw.querySelector('.btn-min');

        maxBtn.onclick = e => {
            let target = e.target;

            while (target.className !== 'app-window') {
                target = target.parentElement;
            }


            if (target.style.width === '100%') {
                // target.style.transition = 'width 0.25s, height 0.25s, left 0.25s, top 0.25s';

                if (target.getAttribute('data-width') === null) {
                    target.style.width = '50%';
                    target.style.height = '50%';
                    target.style.left = '50%';
                    target.style.top = '50%';
                }
                else {
                    target.style.width = target.getAttribute('data-width');
                    target.style.height = target.getAttribute('data-height');
                    target.style.left = target.getAttribute('data-left');
                    target.style.top = target.getAttribute('data-top');
                }

                target.querySelector('textarea').style.height = `${target.clientHeight * 0.7}px`;

                // setTimeout(() => {
                target.style.transition = 'width 0s, height 0s, left 0s, top 0s';
                // }
                // , 250);

            } else {
                let btnSave = target.querySelector('btn.btn-save');
                let btnSaveAs = target.querySelector('btn.btn-saveas');

                if (btnSave !== null) {
                    btnSave.style.display = 'none';
                }

                if (btnSaveAs !== null) {
                    btnSaveAs.style.display = 'none';
                }

                target.style.animation = 'expanddiv 0.25s';
                target.setAttribute('data-width', target.style.width);
                target.setAttribute('data-height', target.style.height);
                target.setAttribute('data-left', target.style.left);
                target.setAttribute('data-top', target.style.top);

                target.style.width = '100%';
                target.style.height = '100%';
                target.style.left = '0';
                target.style.top = '5vh';



                target.querySelector('textarea').style.height = `${target.clientHeight * 0.7}px`;

                setTimeout(() => {
                    target.style.animation = '';
                }
                    , 250);
            }

        }

        minBtn.onclick = e => {
            let target = e.target;

            while (target.className !== 'app-window') {
                target = target.parentElement;
            }

            target.style.display = 'none';
        };

    });
};

const loadF = function () {
    const loader = document.querySelector('#loader');
    const login = document.querySelector('#login');
    const home = document.querySelector('#home');

    document.getElementById('datefillJs').innerHTML = new Date().toDateString();

    loader.style.animation = 'fadeOut 2s';
    setTimeout(() => {
        loader.style.display = 'none';
        login.style.display = 'flex';
        // home.style.display = 'flex'; /* dev */

    }, LOADER_TIME);

    add_file('hello world.txt', 'root/guest/Desktop/hello world.txt', JSON.stringify(
        {
            'name': 'hello world',
            'contents': 'Hello, World!',
            'type': 'txt',
            'pos': {
                'x': 50,
                'y': 50
            }
        }
    ));

    add_file('README.txt', 'root/guest/Desktop/README.txt', JSON.stringify(
        {
            'name': 'README',
            'contents': README,
            'type': 'txt',
            'pos': {
                'x': 50,
                'y': 50
            }
        }
    ));

    add_file('about.html', 'root/guest/Desktop/about.html', JSON.stringify(
        {
            'name': 'about',
            'contents': ABOUT_ME,
            'type': 'html',
            'pos': {
                'x': 100,
                'y': 50
            }
        }
    ));

    add_file('portfolio.html', 'root/guest/Desktop/portfolio.html', JSON.stringify(
        {
            'name': 'portfolio',
            'contents': PORTFOLIO,
            'type': 'html',
            'pos': {
                'x': 150,
                'y': 50
            }
        }
    ));

    add_file('contact.html', 'root/guest/Desktop/contact.html', JSON.stringify(
        {
            'name': 'contact',
            'contents': CONTACT_ME,
            'type': 'html',
            'pos': {
                'x': 200,
                'y': 50
            }
        }
    ));

    if (root === undefined) {
        set_env();
    }

    let desktop = root['root'][window.localStorage.getItem('loginname')]['Desktop'];
    let fc = 0;

    for (let file in desktop) {
        if (!(fc % 3)) {
            let br = document.createElement('br');
            document.querySelector('#desk').appendChild(br);
        }

        let fileObj = JSON.parse(desktop[file]);
        let fileDiv = document.createElement('div');
        fileDiv.className = 'app';

        fileDiv.onclick = open_app(fileObj['type']);

        fileDiv.setAttribute('data-file', file);

        let appIcon = document.createElement('div');
        appIcon.className = 'app-image';

        if (fileObj['type'] === 'txt') {
            appIcon.innerHTML = '<center><img src="assets/file.png" /></center>';
        } else if (fileObj['type'] === 'folder') {
            appIcon.innerHTML = '<center><img src="assets/folder.png" /></center>';
        } else if (fileObj['type'] === 'html') {
            appIcon.innerHTML = '<center><img src="assets/html.png" /></center>';
        }

        fileDiv.appendChild(appIcon);

        let appTitle = document.createElement('div');
        appTitle.className = 'app-title';
        appTitle.innerHTML = `${fileObj['name']}.${fileObj['type']}`;
        fileDiv.appendChild(appTitle);

        document.querySelector('#desk').appendChild(fileDiv);
        fc++;
    }
};

const refresh_desktop = () => {
    let desktop = root['root'][window.localStorage.getItem('loginname')]['Desktop'];
    let fc = 0;

    for (let file in desktop) {
        if (!(fc % 3)) {
            let br = document.createElement('br');
            document.querySelector('#desk').appendChild(br);
        }

        let fileObj = JSON.parse(desktop[file]);
        let fileDiv = document.createElement('div');
        fileDiv.className = 'app';

        fileDiv.onclick = open_app(fileObj['type']);

        fileDiv.setAttribute('data-file', file);

        let appIcon = document.createElement('div');
        appIcon.className = 'app-image';

        if (fileObj['type'] === 'txt') {
            appIcon.innerHTML = '<center><img src="assets/file.png" /></center>';
        } else if (fileObj['type'] === 'folder') {
            appIcon.innerHTML = '<center><img src="assets/folder.png" /></center>';
        } else if (fileObj['type'] === 'html') {
            appIcon.innerHTML = '<center><img src="assets/html.png" /></center>';
        }

        fileDiv.appendChild(appIcon);

        let appTitle = document.createElement('div');
        appTitle.className = 'app-title';
        appTitle.innerHTML = `${fileObj['name']}.${fileObj['type']}`;
        fileDiv.appendChild(appTitle);

        document.querySelector('#desk').appendChild(fileDiv);
        fc++;
    }
};

const card_click = (e) => {
    let target = e.target;

    while (target.className !== 'card') {
        target = target.parentElement;
    }

    target.style.cursor = 'progress';

    let loginname = target.getAttribute('data-loginname');
    window.localStorage.setItem('loginname', loginname);
    set_env();

    switch (loginname) {
        case '_add':
            break;
        case 'guest':
            {
                const login = document.querySelector('#login');
                const home = document.querySelector('#home');

                login.style.backdropFilter = 'blur(5px)';
                login.style.animation = 'fadeOut 2s';
                setTimeout(() => {
                    login.style.display = 'none';
                    home.style.animation = 'fadeIn 2s';

                }, 1980);

                setTimeout(() => {
                    home.style.display = 'flex';
                }, 1980);
            }
            break;
        default:
            break;
    }
};

const update_ls = root => window.localStorage.setItem('root', JSON.stringify(root));

const set_env = () => {
    let loginname = window.localStorage.getItem('loginname');

    if (loginname === null) {
        loginname = 'guest';
        window.localStorage.setItem('loginname', loginname);
    }

    root = window.localStorage.getItem('root');

    if (root === null) {
        root = '{}';
        window.localStorage.setItem('root', root);
    }

    root = JSON.parse(root);

    if (!('root' in root)) {
        root['root'] = {};
    }

    if (!(loginname in root['root'])) {
        root['root'][loginname] = { 'Desktop': {} };
    }

    update_ls(root);
};

const add_file = (name, path, contents) => {
    if (root === undefined) {
        set_env();
    }
    /**
     * @param {string} name With extension
     * @param {string} path Can be of the form 'root/guest/Desktop/{name}'
     */

    let pathsp = path.split('/');
    let locref = root['root'];

    if (pathsp[0] != 'root') {
        return;
    }

    for (let i = 1; i < pathsp.length - 1; i++) {
        locref = locref[pathsp[i]];
    }

    locref[pathsp[pathsp.length - 1]] = contents;

    update_ls(root);
};

(() => {
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.onclick = e => {
            card_click(e);
        };
    });

    let appsLi = document.querySelectorAll('#apps li');

    appsLi.forEach(li => {
        li.onmouseover = e => {
            let target = e.target;

            while (target.tagName !== 'LI') {
                target = target.parentElement;
            }

            let tooltip = target.getAttribute('data-tooltip');

            if (tooltip !== null) {
                let nt = document.createElement('div');
                nt.className = 'notification';
                nt.innerHTML = tooltip;
                document.body.appendChild(nt);
                nt.style.top = `${e.clientY - 30}px`;
                nt.style.left = `${e.clientX - 10}px`;
            }
        };

        li.onmouseout = e => {
            let target = e.target;

            while (target.tagName !== 'LI') {
                target = target.parentElement;
            }

            let tooltip = target.getAttribute('data-tooltip');

            let nt = document.querySelectorAll('.notification');

            nt.forEach(n => {
                if (n.innerHTML === tooltip) {
                    n.remove();
                }
            });
        };
    });

    let appindevLi = document.querySelectorAll('.app-in-dev');

    appindevLi.forEach(li => {
        li.onclick = open_app_aid;
    });

    state_update();
})();

window.onload = loadF;