document.addEventListener('DOMContentLoaded', function () {
    /* const btn = document.getElementById('countryBtn'); */
    const select = document.getElementById('countrySelect');
    const hiddenInput = document.getElementById('selectedCountry');

    fetch('./json/countries.json')
        .then(res => res.json())
        .then(countries => {
            countries.forEach(c => {
                const opt = document.createElement('option');
                /* li.innerHTML = `<a class="dropdown-item" data-value="${c.id}">${c.name}</a>`; */
                opt.value = c.iso2;
                opt.text = c.name;
                opt.style.padding = "20px";
                select.appendChild(opt);
            });

            select.addEventListener('change', function () {
                const selected = select.options[select.selectedIndex].textContent;
                hiddenInput.value = selected;
            })

            /* const choices = new Choices(select, {
                searchEnabled: true,
                position: 'top',
                searchPlaceholderValue: "Search country ...",
                callbackOnCreateTemplates : function(template){
                    return{
                        choice : (classNames,data) => {
                            const code = data.value.toLowerCase();
                            return template(`
                                <div class="${classNames.item} ${classNames.itemChoice}" data-choice data-choice-selectable  data-id="${data.id}" data-value="${data.value}" data-select-text="${data.label}" ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} >
                                    <span style="display:flex;align-items:center;gap:8px;">
                                        <img src="flags/${code}.svg" width="16" />
                                        ${data.label}
                                    </span>
                                </div>    
                            `);
                        },
                        item : (classNames,data) => {
                            const code = data.value.toLowerCase();
                            return template(`
                                <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectableState}" data-item data-id="${data.id}" data-value="${data.value}" data-deletable>
                                    <span style="display:flex;align-items:center;gap:8px;">
                                        <img src="flags/${code}.svg" width="18" />
                                        ${data.label}
                                    </span>
                                </div>
                            `);
                        }
                    }
                }
            }); */

            const choices = new Choices(select, {
                searchEnabled: true,
                position: 'top',
                searchPlaceholderValue: "Search country ..."
            });

            select.addEventListener('choice',(event) => {
                const value = event.detail.choice.value.toLowerCase();
                const label = event.detail.choice.label;

                event.detail.choice.customProperties = {
                    flag: `flags/${value}.svg`
                };
            });

            choices.passedElement.element.addEventListener('change',() => {
                const selected = document.querySelector('.choices__item.choices__item--selectable');
                if(selected){
                    const value = selected.getAttribute('data-value').toLowerCase();
                    const text = selected.innerText;
                    selected.innerHTML = `<img src="flags/${value}.svg" width="18" style="margin-right:8px;" /> ${text}`;
                }
            });

            choices.passedElement.element.addEventListener('showDropdown',() => {
                document.querySelectorAll('.choices__item--choice').forEach(el => {
                    const value = el.getAttribute('data-value');
                    if(value){
                        const code = value.toLowerCase();
                        el.innerHTML = `<img src="flags/${code}.svg" width="16" style="margin-right:8px;"/> ${el.innerHTML}`;
                    }
                });
            });



            const saved = hiddenInput.value;
            if (saved) {
                const option = Array.from(select.options).find(o => o.textContent === saved);
                if (option) {
                    choices.setChoiceByValue(option.value);
                }
            }

        })
        .catch(err => console.error(err));
});