function conn() {
    $.ajax({
        url: '/api',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            conn();
        }
    });
}

conn();