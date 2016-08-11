/// <reference path="dependable.d.ts" />

declare namespace DependableList {
    class ListItem {
        constructor(content);
        destroy();
        linkTo(item: ListItem);
        empty();
        apply(func: Function);
    }

    class Dependable {
        dependencies: any;
        unresolved: any;
        destroy();
        resolve(depName: string);
        resolved();
        cloneDependencies(obj: Array<any>);
    }

    export class ListConstruct {
        unresolved: any;
        destroy();
        dependableConstructor(): typeof DependableList.Dependable;
        createDependable();
        call(item: any);
        getDependencyProperty(dependable: Dependable.DependableConstruct);
        plainAddReverse(afterdependable: Dependable.DependableConstruct, dependable: Dependable.DependableConstruct);
        plainAdd(dependable: Dependable.DependableConstruct, afterdependable: Dependable.DependableConstruct);
        add(dependable: Dependable.DependableConstruct, afterTime?);
        lateResolve(listforremove, listforadd, newdependablecontainer, newdependable, unresolveddependable, unresolvedcontainer);
        listOfUnresolved();
        purge();
        empty();
        removeOne(listItem: ListItem);
        findOne(criterionFunction: Function);
        firstItemToSatisfy(func: Function);
        lastItemToSatisfy(func: Function);
        traverse(func: Function);
        traverseConditionally(func: Function);
        dumpToConsole();
        drain();
    }
}
declare var list: DependableList.ListConstruct;
declare module "dependable-list" {
    export = list;
}
