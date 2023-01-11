export const QuillModules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{color: ['#36b59c', 'rgb(32, 169, 224)', 'rgb(250, 171, 26)', 'rgb(244, 128, 54)', 'rgb(171, 29, 81)', 'rgb(25, 122, 192)', 'rgb(0, 167, 134)', 'rgb(176, 209, 57)', 'rgb(114, 13, 5)', 'rgb(27, 56, 100)']}],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

export const QuillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'color',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];