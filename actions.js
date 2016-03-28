var initVector = new Array(5, 3, 2, 6, 7, 4);

var vector = initVector.slice();

var $mainVector = $('#main .vector');

renderHtmlVector(vector, $mainVector);

var last_pos;
var i;
var n;
var aux_val;
var aux_pos;

reset();
$('.btnReset').click(reset);

$('.btnNewVector').click(function () {
    $('#setVectorModal').modal('show');
});

$('.btnSetVector').click(function () {

    var vector_str = $('#vectorInput').val();

    vector_str = vector_str.replace(/ /g, '');

    initVector = vector_str.split(',');

    reset();

    $('#setVectorModal').modal('hide');

});

function reset() {
    vector = initVector.slice();
    renderHtmlVector(vector, $mainVector);
    last_pos = vector.length - 1;
    i = 0;
    n = last_pos;
    logAuxVar(-1, -1);
    logCont(-1, -1);
    $('#resultOut').html('');
    logText('Clique em inciar para começar a ordenação');
    $('.btnNext').addClass('btn-success');
    $('.btnNext .text').html('Iniciar');
    $('.btnNext i').attr('class', 'glyphicon glyphicon-triangle-right');
    $('.btnNext').removeClass('disabled').unbind('click');
    $('.btnNext').click(function () {
        selectionShort();
    });

}

function selectionShort() {

    if (i === last_pos) {
        $('.btnNext .text').html('Ordenado!');
        $('.btnNext i').attr('class', 'glyphicon glyphicon-ok');
        $('.btnNext').addClass('disabled').unbind('click');
        logText('O vetor está ordenado!');
        logTidy(i + 1);
    }

    logCont(i, n);
    var logTexBusy = false;
    if (n === last_pos) {
        if (i === 0) {
            var $vector = $('<div>').addClass('vector str' + 0);
            $('#resultOut').append($vector);
            renderHtmlVector(vector, $vector, '#inicial');
            if (i < last_pos) {
                $('.btnNext').removeClass('btn-success');
                $('.btnNext .text').html('Avançar');
                $('.btnNext i').attr('class', 'glyphicon glyphicon-forward');
            }
        }

        //definimos uma variavél auxiliar sendo seu valor incia o ultimo do vetor
        aux_val = vector[last_pos];
        aux_pos = last_pos;

        logAuxVar(aux_pos, aux_val);
        if (i !== last_pos) {
            var text = '"i" passa a valer ' + i + ' definindo o local do vetor que será trocado com o '
                    + 'menor valor, <br>a qual encontraremos neste passo.';
            text += '<br>----------------';
            text += '<br>Guarda-se o valor e a possição do último espaço do vetor na varivél auxiliar.';
            text += '<br>Por hora, esse é o menor valor. Vamos para o próximo >>';
            logText(text);
        }
        logTexBusy = true;
        if (i < last_pos) {
            $('.btnNext .text').html('Avançar');
            $('.btnNext i').attr('class', 'glyphicon glyphicon-forward');
        }
    }

    //verifica qual o menor valor
    if (n >= i) {
        var text = 'Verifica valor em [' + n + '], ele é menor que a auxliar?';

        if (vector[n] < aux_val) {

            aux_val = vector[n];
            aux_pos = n;

            text += '<br>SIM! Então subtistuimos o valor da auxiliar.<br>E vamos para o próximo >>';

            logAuxVar(aux_pos, aux_val);
        } else {
            text += ' NÂO!<br>Então vamos para o próximo >>';
        }

        $('#main').find('.vector.main .item').removeClass('change');
        $('#main').find('.vector.main .item' + n).addClass('change');
        if (!logTexBusy)
            logText(text);
    }

    if (n < i) {
        //efetua a troca
        vector[aux_pos] = vector[i];
        vector[i] = aux_val;

        renderHtmlVector(vector, $mainVector);
        logTidy(i);

        logChange(i, aux_pos);
        n = last_pos;
        i++;
        logStr(vector, i);

        $('.btnNext .text').html('Inciar #passo' + (i + 1));
        $('.btnNext i').attr('class', 'glyphicon glyphicon-triangle-right');

        var text = 'Percorrido todo o vetor efetuamos a troca do valor menor (aux) com a possição correta (i).';
        text += '<br>Com isso concluímos o #passo' + i;

        logText(text);
    } else {
        n--;
    }
}

function logTidy(i) {
    for (var p = 0; p <= i; p++) {
        $('#main').find('.vector.main .item' + p).addClass('tidy');
    }
}

function logStr(array, str) {
    var $vector = $('<div>').addClass('vector str' + str);
    $('#resultOut').append($vector);
    renderHtmlVector(array, $vector, '#passo' + str);
}

function logAuxVar(aux_pos, aux_val) {
    if (aux_pos < 0) {
        aux_pos = '-';
    }
    if (aux_val < 0) {
        aux_val = '-';
    }
    $('.auxVar.aux .selector').html(aux_pos);
    $('.auxVar.aux  .content').html(aux_val);

    $('#main').find('.vector.main .item').removeClass('smaller');
    $('#main').find('.vector.main .item' + aux_pos).addClass('smaller');
}

function logChange(i, aux_pos) {
    $('#resultOut .str' + i + ' .item' + aux_pos).addClass('change');
    $('#resultOut .str' + i + ' .item' + i).addClass('change');
}

function renderHtmlVector(array, $target, line) {
    $target.html('');

    if (line) {
        var $line = $('<div>').addClass('line').html(line);
        $target.append($line);
    }

    for (var i = 0; i < array.length; i++) {
        $item = $('<div>').addClass('item item' + i);
        if (i === 0) {
            $item.addClass('first');
        } else if (i === array.length - 1) {
            $item.addClass('last');
        }
        var $selector = $('<span>').addClass('selector').html(i);
        var $content = $('<span>').addClass('content').html(array[i]);
        $target.append($item.append($selector).append($content));
    }

    $clear = $('<div>').addClass('clear');
    $target.append($clear);
}

function logCont(i, n) {
    if (n < 0) {
        n = '-';
    }
    if (i < 0) {
        i = '-';
    }
    $('.auxVar.i .content').html(i);
    $('.auxVar.n .content').html(n);
}

function logText(text) {
    $('#logText').html(text);
}