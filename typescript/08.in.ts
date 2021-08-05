interface State {
    userId: string;
    pageTitle: string;
    recentFiles: string[]
    pageContents: string;
}

// bad
// interface TopNavState {
//     userId: string;
//     pageTitle: string;
//     recentFiles: string[]
// }

// good
// interface TopNavState {
//     userId: State['userId'];
//     pageTitle: State['pageTitle']
//     recentFiles: State['recentFiles']
// }

// better
// type TopNavState = {
//     [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k];
// }

// better better
type Keys = keyof State;
type TopNavState = Pick<State, 'userId'>;



// Record
// type petsGroup = 'dog' | 'cat' | 'fish';
// interface IPetInfo {
//     name:string,
//     age:number,
// }

// type IPets = Record<petsGroup, IPetInfo>;
