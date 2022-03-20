jQuery(document).ready(function($) {
    var code_id = 0;

    $('pre').each(function() {
        code_id++;
        $(this).attr('data-code-id', code_id).wrap('<div class="pre-wrapper"/>');
        $(this).parent().css('margin', $(this).css('margin'));

        var button_html = `<button class="copy-snippet">Copy</button>`
        $(button_html).insertBefore($(this)).data('copy-target-id', code_id);
    });

    $('body').on('click', '.copy-snippet', function(ev) {
        ev.preventDefault();

        var $copy_btn = $(this);
        var target_id = $copy_btn.data('copy-target-id');

        $pre = $(document).find(`pre[data-code-id=${target_id}]`);

        if ($pre.length) {
            var text_area = document.createElement("textarea");
            text_area.value = $pre.find("code").text();
            document.body.appendChild(text_area);
            text_area.select();

            try {
                document.execCommand('copy');
                $copy_btn.text('Copied').prop('disabled', true);;
            } catch (err) {
                $copy_btn.text('FAILED: Could not copy').prop('disabled', true);;
            } finally {
                document.body.removeChild(text_area);
            }
            setTimeout(function() {
                $copy_btn.text('Copy').prop('disabled', false);;
            }, 2000);
        }
    });
});