import {combineReducers} from 'redux'
import {
    ADD_GUEST,
    DELETE_GUEST,
    EDIT_GUEST,
    CHECK_GUEST,
    VisibilityFilters, SET_VISIBILITY_FILTER, GET_GUESTS
} from './actions';
import {addGuest, deleteGuest, editGuest, getGuests} from '../../service/list-service'

let allGuest = 0;

function editArray(state, id, name) {
    let array = JSON.parse(JSON.stringify(state));
    const index = array.map(function (e) {
        return e.id;
    }).indexOf(id);
    if (~index) {
        if (name) {
            array[index].name = name;
        } else {
            array[index].isChecked = !array[index].isChecked;
            array[index].isChecked ? allGuest++ : allGuest--;
        }
        editGuest(array[index]);
    }
    return array;
}

function list(state = [], action) {
    switch (action.type) {
        case GET_GUESTS:
            return getGuests();
        case ADD_GUEST:
            allGuest++;
            let guest = {
                id: generateId(action.name),
                name: action.name,
                isChecked: false
            };
            addGuest(guest);
            return [...state, guest];
        case DELETE_GUEST:
            action.guest.isChecked ? (allGuest = allGuest - 2) : allGuest--;
            deleteGuest(action.guest);
            return state.filter(
                guest => guest.id !== action.guest.id
            );
        case CHECK_GUEST:
            return editArray(state, action.id);
        case EDIT_GUEST:
            if (action.guest.name) {
                return editArray(state, action.guest.id, action.guest.name);
            }
            action.guest.isChecked ? (allGuest = allGuest - 2) : allGuest--;
            deleteGuest(action.guest);
            return state.filter(
                guest => guest.id !== action.guest.id
            );
        default:
            return state
    }
}


function calcAllGuest(filter, list) {
    switch (filter) {
        case VisibilityFilters.SHOW_TWO:
            allGuest = list.filter(guest => guest.isChecked).length * 2;
            break;
        case VisibilityFilters.SHOW_ONE:
            allGuest = list.filter(t => !t.isChecked).length;
            break;
        default:
            allGuest = 0;
            for (let i = 0; i < list.length; i++) {
                allGuest = list[i].isChecked ? allGuest + 2 : allGuest + 1;
            }
    }
}


function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            calcAllGuest(action.item.filter, action.item.list);
            return action.item.filter;
        default:
            return state
    }
};

function allGuests() {
    return allGuest;
}

const listApp = combineReducers({
    list,
    visibilityFilter,
    allGuests
});
export default listApp

function generateId(name) {
    return name + Math.random().toString(16).slice(2)
}