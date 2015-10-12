/**
 * Created by akito on 10/11/15.
 */

import Test from './modules/test';
import _ from 'underscore';

const t = new Test();

$.get('/v1/channel', (response) => {
  _.map(response, (channel) => {
    const name = channel.name;
    const id = channel.id;
    $('#js-channel-target').append('<p class="js-channel-info" data-id="' + id + '">' + name + '</p>');
  });

  $('.js-channel-info').click((e) => {
    const id = $(e.target).data('id');
    getMessage(id);
  });
});

function getMessage(id) {
  $.ajax({

  });
}