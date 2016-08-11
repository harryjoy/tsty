import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import "./ArrayMixins";

/**
 * Convert array of documents to a array of ids from that documents.
 */
export function mapIds(documents: any, idProp?: string) {
    return _.map(documents, (d: any) => {
        return idProp ? d[idProp] : d.id;
    });
}

/**
 * Merge two objects, simply overrides all source properties into destination.
 */
export function mergeObjects(source: any, dest: any) {
    _.forOwn(source, (val: any, key: any) => {
        dest["" + key] = val;
    });
    return dest;
}

/**
 * Lower case first letter of string
 */
export function lowerCaseFirstLetter(text: string): string {
    return text.charAt(0).toLowerCase() + text.slice(1);
}

/**
 * Recursively traverse path and execute callbacks for each file found.
 * Callback will have file path with basePath included in it as argument.
 */
export function traverseDirectory(basePath: string, excludeDirs: string, cb: Function) {
    const jsFileRegex  = /(.*).js/;
    if (fs.existsSync(basePath)) {
        fs.readdirSync(basePath).forEach((file) => {
            let filePath = path.join(basePath, file);
            let fstat = fs.statSync(filePath);
            if (fstat.isFile() && jsFileRegex.test(file)) {
                cb(filePath)
            } else if (fstat.isDirectory() && excludeDirs.indexOf(file) === -1) {
                traverseDirectory(filePath, excludeDirs, cb);
            }
        });
    }
}

/**
 * Find different between 2 documents.
 * @param {any} last    
 * @param {any} current 
 * @param {string}     idProp  Poperty name holding ID/key to identify document.
 */
export function diffDocs(last: any, current: any, idProp?: string) {
    idProp = idProp || "id";
    return {
        updated: diffObj(current, last, idProp),
        deleted: mapIds(diffObj(last, current, () => {
            return true;
        }, idProp), idProp)
    };
}

/**
 * diffObj - similar to _.difference, except uses _.isEqual to deep compare objects in arrays
 * @param array - Array: array of objects
 * @param values - Array: array of objects to subtract
 * @param callback - Function | String: optional isEqual comparison callback.
 *                   For sorted arrays, sort property is implictly compared first.
 * @param sortProp - String: optional parameter specifies items are sorted by corresponding
 *                   primitive property (must be sorted in ascending order)
 */
export function diffObj(array: any, values: any, cb: any, sortProp?: any) {
    if (typeof cb === "string") {
        sortProp = cb;
        cb = null;
    }
    if (sortProp) {
        return _.reduce(array, (memo: any, item: any) => {
            let value, idx: number;
            while(memo.lastIndex < values.length) {
                value = values[memo.lastIndex];
                if (value[sortProp] < item[sortProp]) {
                    memo.lastIndex++;
                    continue;
                }
                break;
            }
            idx = memo.lastIndex;
            while(idx < values.length) {
                if (value[sortProp] > item[sortProp]) {
                    break;
                }
                if (_.isEqualWith(value, item, cb)) {
                    return memo;
                }
                value = values[++idx];
            }
            memo.diff.push(item);
            return memo;
        }, {
            diff: [],
            lastIndex: 0
        }).diff;
    }
    return _.reduce(array, (memo: any, item: any) => {
        if (!_.find(values, (value: any) => {
            return _.isEqualWith(value, item, cb);
        })) {
            memo.push(item);
        }
        return memo;
    }, []);
}
