/*
Functions:
1. createElemWithText----------------Finished
2. createSelectOptions~~~~~~~~~~~~~~~Finished
3. toggleCommentSection--------------Finished
4. toggleCommentButton~~~~~~~~~~~~~~~Finished
5. deleteChildElements---------------Finished
6. addButtonListeners~~~~~~~~~~~~~~~~Finished?
7. removeButtonListeners-------------Finished
8. createComments~~~~~~~~~~~~~~~~~~~~Finished
9. populateSelectMenu----------------Finished
10. getUsers~~~~~~~~~~~~~~~~~~~~~~~~~Finished
11. getUserPosts---------------------Finsihed
12. getUser~~~~~~~~~~~~~~~~~~~~~~~~~~Finsihed
13. getPostComments------------------Finsihed
14. displayComments~~~~~~~~~~~~~~~~~~Finsihed
15. createPosts----------------------Finsihed
16. displayPosts~~~~~~~~~~~~~~~~~~~~~Finsihed
17. toggleComments-------------------Finsihed
18. refreshPosts~~~~~~~~~~~~~~~~~~~~~Finsihed
19. selectMenuChangeEventHandler-----
20. initPage~~~~~~~~~~~~~~~~~~~~~~~~~Finished?
21. initApp--------------------------Finished?
*/

function createElemWithText(elementName = "p", textInfo = "", classInfo = "") {

    // Create new element
    let newElem = document.createElement(elementName);

    // Add text to newElem
    newElem.textContent = textInfo;

    // Add class name to newElem
    newElem.className = classInfo;

    // return newElem
    return newElem;
} // end createElemWithText

function createSelectOptions(users) {

    // if jsonData has no information, return it.
    if (!users) return;

    // create data array
    let dataArray = [];

    // for each user, create element
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        let opt = document.createElement('option');
        opt.value = user.id;
        opt.textContent = user.name;
        dataArray.push(opt);
    }

    // return dataArray
    return dataArray;
} // end createSelectOptions

function toggleCommentSection(postId) {

    // if postId has no information
    if (!postId) return;

    // get the comment sections
    let commentSection = document.querySelector(`section[data-post-id="${postId}"]`);

    // if the commentSection is not null
    if (commentSection) {
        commentSection.classList.toggle("hide");
        return commentSection;
    } // end if
    // if commentSection is null
    else {
        return null;
    }

} // end toggleCommentSection

function toggleCommentButton(postId) {

    // if postId has no information
    if (!postId) return;

    // get the comment sections
    let commentButton = document.querySelector(`button[data-post-id="${postId}"]`);

    // if not null
    if (commentButton) {
        // switch text of the comment button
        commentButton.textContent = commentButton.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";
        return commentButton;
    } // end if
    else {
        return null;
    }

} // end toggleCommentButton

function deleteChildElements(parentElement) {

    // if no information, return undefined
    if (!(parentElement instanceof HTMLElement)) return;

    // define child
    let child = parentElement.lastElementChild;

    // while child exists, delete children
    while (parentElement.lastElementChild) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    } // end while loop

    // return empty parent Element
    return parentElement;
} // end deleteChildElements

function addButtonListeners() {

    // select all buttons inside the main element
    let buttons = document.querySelector("main").querySelectorAll("button");

    // loop through the buttons
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        // get postId
        let postId = button.dataset.postId;
        // add eventlistener
        button.addEventListener("click", function(e) { toggleComments(e, postId) }, false);
    } // end for loop

    return buttons;
} // end addButtonListeners

function removeButtonListeners() {

    // select all buttons inside the main element
    let buttons = document.querySelector("main").querySelectorAll("button");

    // loop through the buttons
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        // get postId
        let postId = button.dataset.postId;
        // remove eventListener
        button.removeEventListener("click", function(e) { toggleComments(e, postId) }, false);
    } // end for loop

    return buttons;
} // end removeButtonListeners

function createComments(comments) {

    // if comments is empty, return undefined
    if (!comments) return;
    // create fragment
    let elemFrag = document.createDocumentFragment();

    // loop through comments
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];

        // create article elem
        let a = document.createElement('article');
        // create h3 elem with comment name
        let h3 = createElemWithText('h3', comment.name);
        // create paragraph elem
        let p1 = createElemWithText('p', comment.body);
        // create email paragraph
        let p2 = createElemWithText('p', `From: ${comment.email}`)

        // append all elements
        a.appendChild(h3);
        a.appendChild(p1);
        a.appendChild(p2);

        // append the article to the fragment
        elemFrag.appendChild(a);
    } //end for loop

    // return fragment
    return elemFrag;
} // end createComments

function populateSelectMenu(users) {

    // if users is empty, return undefined
    if (!users) return;
    // select the selectMenu id
    let menu = document.querySelector("#selectMenu");
    // passes the data to createSelectOptions to get an array
    let options = createSelectOptions(users);

    // loop through and append each option to the menu
    for (let i = 0; i < options.length; i++) {
        let option = options[i];
        menu.append(option);
    } // end for loop

    // return menu
    return menu;

} // end populateSelectMenu

let getUsers = async() => {

        let retrieve;
        // fetch users from jsonplaceholder.typicode.com
        try {
            retrieve = await fetch("https://jsonplaceholder.typicode.com/users");
        } // end try
        catch (error) {
            console.log(error);
        } // end catch

        // return information
        return await retrieve.json();

    } // end getUsers

let getUserPosts = async(userId) => {

        // if userId has nothing
        if (!userId) return;

        let retrieve;

        // try to fetch data for userId
        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        } // end try
        catch (error) {
            console.log(error);
        } // end catch

        // return information
        return retrieve.json();

    } // end getUserPosts

let getUser = async(userId) => {

        // if userId has nothing
        if (!userId) return;

        let retrieve;

        // try to fetch data for userId
        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        } // end try
        catch (error) {
            console.log(error);
        } // end catch

        // return information
        return retrieve.json();

    } // end getUser

let getPostComments = async(postId) => {

        // if userId has nothing
        if (!postId) return;

        let retrieve;

        // try to fetch data for userId
        try {
            retrieve = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        } // end try
        catch (error) {
            console.log(error);
        } // end catch

        // return information
        return retrieve.json();

    } // end getPostComments

let displayComments = async(postId) => {

        //if userId has nothing
        if (!postId) return;

        // create section element
        let section = document.createElement("section");

        // set attribute
        section.dataset.postId = postId;

        // add classes to the section element
        section.classList.add("comments");
        section.classList.add("hide");

        let comments = await getPostComments(postId);
        let fragment = createComments(comments);
        section.append(fragment);

        // return section element
        return section;

    } // end displayComments

let createPosts = async(posts) => {


        // return undefined if posts empty
        if (!posts) return;

        // create document fragment
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < posts.length; i++) {
            // get post
            let post = posts[i];

            // create article elem
            let a = document.createElement('article');
            // create h2 element with post title
            let h2 = createElemWithText('h2', post.title);
            // create post body
            let p1 = createElemWithText('p', post.body);
            // create p element with post Id
            let p2 = createElemWithText('p', `Post ID: ${post.id}`)
                // create author variable
            let author = await getUser(post.userId);
            // create p element with author's info
            let aInfo = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
            // create p element with author catchphrase
            let aCatch = createElemWithText('p', `${author.company.catchPhrase}`)

            // create button
            let button = document.createElement("button");
            button.innerHTML = "Show Comments";
            button.dataset.postId = post.id;

            // append all elements
            a.append(h2);
            a.append(p1);
            a.append(p2);
            a.append(aInfo);
            a.append(aCatch);
            a.append(button);

            // display Comments
            let section = await displayComments(post.id);

            // append section
            a.append(section);

            // append the article to the fragment
            fragment.append(a);

        } // end for loop

        // return fragment
        return fragment;
    } // end createPosts

let displayPosts = async(posts) => {

        // select the main element
        let main = document.querySelector("main");

        // if posts exists element is equal to createPosts
        // if posts does not exist, element is equal to paragraph element 'p'
        let element = (posts) ? await createPosts(posts) : document.querySelector("main p");

        // append element to main
        main.append(element);

        return element;
    } // end displayPosts

function toggleComments(event, postId) {

    // if event or postId has no data, return undefined
    if (!event || !postId) return;

    event.target.listener = true;

    let section = toggleCommentSection(postId);
    let button = toggleCommentButton(postId);

    // return section, button array
    return [section, button];

} // end toggleComments

let refreshPosts = async(posts) => {

        // if posts has no data, return undefined
        if (!posts) return;

        // remove listeners
        let removeButtons = removeButtonListeners();
        // delete children elements
        let main = deleteChildElements(document.querySelector("main"));
        // create fragment
        let fragment = await displayPosts(posts);
        // re-add listeners
        let addButtons = addButtonListeners();

        // return buttons, main, fragment, and button array
        return [removeButtons, main, fragment, addButtons];

    } // end refreshPosts

let selectMenuChangeEventHandler = async(event) => {

        //let userId = event ? .target ? .value || 1;
        let posts = await getUserPosts(userId);
        let refArr = await refreshPosts(posts);

        return [userId, posts, refArr];
    } // end selectMenuChangeEventHandler

let initPage = async() => {

        // create users array
        let users = await getUsers();
        // pass users into populateSelectMenu to get the element selected from the menu
        let select = populateSelectMenu(users);

        // return users and the selected element
        return [users, select];
    } // end initPage

function initApp() {

    // call initPage
    initPage();

    let selectMenu = document.querySelector("#selectMenu");
    selectMenu.addEventListener("change", function(event) { selectMenuChangeEventHandler(event) }, false);
} // end initApp

document.addEventListener("DOMContentLoaded", initApp);