      // CONFIG
      $.jribbble.setToken('a129781e88f49589bae19210ceb3020bd7a6188864d1e20e26923f21b4ecb6a0');


			var callback = function (shots) {


						/*---------------------------------------------------------------------------------
						 	Prepare container



						 ---------------------------------------------------------------------------------*/

						 		shotsArr = [];

						/*---------------------------------------------------------------------------------
						 	The Loop



						 ---------------------------------------------------------------------------------*/

                shots.forEach(function(shot) {

					                // Do calculation for shot power
							        var rawpower = shot.likes_count / shot.views_count*100;
							        var flatpower = Math.round(rawpower*100)/100;

					                // Create (clone) jQuery ibject
							                li = $('#shotTemplate').clone();

								                $('#shotTemplate').hide();

								                // Update clone data
								                li.show();
								                li.attr({id:shot.id}); 									// set ID to shot ID

								                // Image
								                li.find('.scrshot').attr('src',shot.images.normal); 		// update thumbnail
								                li.find('a').attr('href',shot.html_url)

												// Shot article
								                li.find('.title').text(shot.title); 					// update title
//								                li.find('.username').html('<a href="'+shot.user.html_url+'">'+shot.user.username+'</a>');

												// Stats
								                li.find('.views_count').text(shot.views_count); 		// update stats
																li.find('.likes_count').text(shot.likes_count);

												// Scores
								                li.find('.score').text(flatpower+"%"); 					// update score

									                // Humanise the scores
									                if(flatpower<1) li.find('.tab').html("<i class='icon-remove icon-white'></i>");
									                if(flatpower<10) li.find('.tab').html("<i class='icon-heart icon-white'></i>");
									                if(flatpower>10) li.find('.tab').html("<i class='icon-star icon-white'></i>");
																	if(flatpower>15) li.find('.tab').html("<i class='icon-fire icon-white'></i>");

								                //li.find('.hoverlay').hover(function(){$(this).fadeIn(1000);},function(){ $(this).fadeOut(1000);});

								                // Object Vars
								                li.rawpower		= rawpower;
								                li.flatpower 	= flatpower;


									// Put the new jQuery objects into an array
						            shotsArr.push(li);

					            });

						/*---------------------------------------------------------------------------------
						 	Sort



						 ---------------------------------------------------------------------------------*/

								function makeNumericCmp(property) {
								    return function (a, b) {
								        return parseInt(b[property]) - parseInt(a[property]);
								    };
								}

								shotsArr.sort(makeNumericCmp('rawpower'));

						/*---------------------------------------------------------------------------------
						 	Append



						 ---------------------------------------------------------------------------------*/
						shotsArr.join();
						$('#shotsByList').append(shotsArr).fadeIn(1000);

			        }


					/*---------------------------------------------------------------------------------
					 	Options



					 ---------------------------------------------------------------------------------*/


					 /* STANDARDS
					---------------------------*/
					//$(".hoverlay").hover(function(){$(this).fadeOut(100);$(this).fadeIn(500);});

					/* FUNCTIONS
					---------------------------*/

						// Fetch List
						function fetchList(filter) {
							//$('#shotsByList').html('');
							$.jribbble.shots('debuts').then(function(shots){
                 // loadShots(shots);
                  callback(shots);
              });
						}

						function fetchPlayerShots(filter) {
							$('#shotsByList').empty();

console.log("player"+PlayerName);
							$.jribbble.users(filter).shots().then(function(shots){
                 // loadShots(shots);
                  callback(shots);
              });
  
					}

						// Read a page's GET URL variables and return them as an associative array.
						function getUrlVars()
							{
							    var vars = [], hash;
							    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
							    for(var i = 0; i < hashes.length; i++)
							    {
							        hash = hashes[i].split('=');
							        vars.push(hash[0]);
							        vars[hash[0]] = hash[1];
							    }
							    return vars;
							}


					/* Triggers
					---------------------------*/
						// player
						$('#PlayerName').keyup(function() {
							var player = $('#PlayerName').val();
							$('#msg').text('Fetching shots from ' + player).fadeIn(1000);
							fetchPlayerShots(player)
						});


					/* Launch default list
					---------------------------*/
					var PlayerName = getUrlVars()['PlayerName'];
console.log("plauer"+PlayerName);
					if(PlayerName)
						{
							fetchPlayerShots(PlayerName);
						} else {
							fetchList('debuts');
						}
