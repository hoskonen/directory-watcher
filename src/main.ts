import watch from 'node-watch';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

enum operationMode {
    UPDATE = 'update',
    REMOVE = 'remove'
}

const newFileName = 'texgen-renamed.zip';

// set your source folder
const source1 = 'C:\\Users\\petri.hoskonen\\Desktop\\source\\';
const destination1 = 'C:\\Users\\petri.hoskonen\\Desktop\\destination\\';

console.log('file watchers starting..');
watch(source1, { recursive: true, filter: /\.zip$/ }, function(event, fileName) {
    if (fileName && event === operationMode.UPDATE) {
        console.log('%s appeared for processing..', fileName);

        // copy file to our destination
        fs.copyFile(fileName, destination1 + newFileName, function(error) {
            if (error) {
                throw error;
            }

            // remove the copied file
            fs.unlinkSync(fileName);

            console.log('file renamed and moved succefully!');
        })
    }
  });
