import watch from 'node-watch';

// set your source folder
const source1 = '';
// const source2 = '';

watch(source1, { recursive: true, filter: /\.zip$/ }, function(evt, name) {
    console.log('%s changed.', name);
  });
