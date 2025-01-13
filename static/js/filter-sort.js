document.addEventListener("DOMContentLoaded", function() {
    const sortBtn = document.getElementById('js-sort');
    const selectOptions = document.getElementById('js-select-ul');

    sortBtn.addEventListener('click', function() {
        // Toggle display property
        if (selectOptions.style.display === 'block') {
            selectOptions.style.display = 'none';
        } else {
            selectOptions.style.display = 'block';
        }

        // Toggle arrow indicator
        sortBtn.classList.toggle('active');
    });
});