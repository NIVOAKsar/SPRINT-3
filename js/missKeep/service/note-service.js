import utilService from '/js/service/util-service.js';

const NOTES_KEY = 'NOTES';
const PINNED_KEY = 'PINNED';
var gNotes = [];
var gPinnedNotes = [];

_getQuery();

function _getQuery() {
    let storage = utilService.loadFromStorage(NOTES_KEY);
    if (storage) {
        gNotes = utilService.loadFromStorage(NOTES_KEY);
        gPinnedNotes = utilService.loadFromStorage(PINNED_KEY)
    } else {
        gNotes = [];
        gPinnedNotes = [];
        utilService.saveToStorage(NOTES_KEY, gNotes);
        utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
    }
}

/*********************** NOTE ***********************/
function _createNote(content, type) {
    return {
        id: utilService.getRandomId(),
        type: type,
        timestamp: Date.now(),
        createdAt: new Date().toLocaleDateString(),
        content: content,
        bgColor: '#e7df97'
    }
}
function addNote(content, type) {
    let concon = _convertContent(content, type); // converted content
    gNotes.push(_createNote(concon, type));
    utilService.saveToStorage(NOTES_KEY, gNotes);
}
function removeNote(noteId) {
    let idx = getNoteIdxById(noteId);
    gNotes.splice(idx, 1);
    utilService.saveToStorage(NOTES_KEY, gNotes);
}
function getNoteById(noteId) {
    return gNotes.find(note => note.id === noteId);
}
function getNoteIdxById(noteId) {
    return gNotes.findIndex(note => note.id === noteId);
}
function getNotes() {
    return gNotes;
}

/*********************** PINNED NOTE ***********************/

function pinNote(noteId) {
    let idx = getNoteIdxById(noteId);
    gPinnedNotes.push(gNotes.splice(idx, 1));
    utilService.saveToStorage(NOTES_KEY, gNotes);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}
function unpinNote(noteId) {
    let idx = getPinnedNoteIdxById(noteId);
    gNotes.push(gPinnedNotes.splice(idx, 1));
    utilService.saveToStorage(NOTES_KEY, gNotes);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}
function getPinnedNoteById(noteId) {
    return gPinnedNotes.find(note => note.id === noteId);
}
function getPinnedNoteIdxById(noteId) {
    return gPinnedNotes.findIndex(note => note.id === noteId);
}
function getPinnedNotes() {
    return gPinnedNotes;
}


/*********************** OTHER ***********************/
function clearAllNotes() {
    gNotes = [];
    gPinnedNotes = [];
    utilService.saveToStorage(NOTES_KEY, gNotes);
    utilService.saveToStorage(PINNED_KEY, gPinnedNotes);
}
function setBgColor(color, noteId) {
    let note = getNoteById(noteId);
    note.bgColor = color;
    utilService.saveToStorage(NOTES_KEY, gNotes);
}
function _convertContent(content, type) {
    switch (type) {
        case 'note-todos':
            return content.split(',');
            break;
        case 'note-img':
            return content;
            break;
        case 'note-video':
            return content;
            break;
        default:
            return content;
            break;
    }
}

export default {
    addNote,
    removeNote,
    getNotes,
    pinNote,
    unpinNote,
    getPinnedNotes,
    clearAllNotes,
    setBgColor
}