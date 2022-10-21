import watch from 'node-watch';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires

enum operationMode {
    UPDATE = 'update',
    REMOVE = 'remove'
}

const newFileName = 'texgen-renamed.zip';

// set your source folder
const source1 = '';
const destination1 = '';

console.log('file watchers starting..');

try {
    const investigator = watch(source1, { recursive: true, filter: /\.zip$/ }, function(event, fileName) {
        if (fileName && event === operationMode.UPDATE) {
            console.log('%s appeared for processing..', fileName);

            // copy file to our destination
            fs.copyFile(fileName, destination1 + newFileName, function(error) {
                if (error) {
                    throw error;
                }

                // remove the copied fileö
                fs.unlinkSync(fileName);
                investigator.close();

                console.log('file ' + fileName + ' renamed to ' + newFileName + ' and moved and deleted succesfully!');
            })
        }
    });

} catch(error) {
    console.log('something went wront, check your source and destination paths!');
    throw error;
};

