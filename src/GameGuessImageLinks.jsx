var imageArr = {
  pizza: "//live.staticflickr.com/5238/5913452967_2c1cde583b_b.jpg",
  gyros: "//live.staticflickr.com/7083/7239017358_8df9fc4d1b_b.jpg",
  hamburger: "//live.staticflickr.com/8394/8707943008_f89b5f68e7_b.jpg",
  stew: "//live.staticflickr.com/1548/24852259331_0635119acd_b.jpg",
  england: "//live.staticflickr.com/65535/49737935531_94f6a09932_h.jpg",
  hungary: "//live.staticflickr.com/7875/47205402932_d295a75ca4_b.jpg",
  france: "//live.staticflickr.com/8084/29068272690_d79a97a764_b.jpg",
  italy: "//live.staticflickr.com/4812/45160358134_a6b4aefec9_b.jpg",
  chemistry: "//live.staticflickr.com/65535/49696704163_8201fb0f63_b.jpg",
  history: "https://ujkor.hu/wp-content/uploads/2018/04/matya_borito.jpg",
  biology: "https://www.mozaweb.hu/thumbnail/22/40/00000004022/wide_hq.jpg",
  math: "https://federalresumecoach.com/wp-content/uploads/2020/12/getty_470493341_20001333200092800_398689.jpg",
  football: "https://static.businessworld.in/article/article_extra_large_image/1530602768_Q2MmBQ_Isl-Footbal-League-Mumbai-470.jpg",
  basketball: "https://24.p3k.hu/app/uploads/2021/01/kobi.jpg",
  volleyball: "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1536936974/primary/exvzqcvorticinejmmel",
  rugby: "https://images.theconversation.com/files/347919/original/file-20200716-17-179wc7x.jpg?ixlib=rb-1.1.0&rect=7%2C7%2C4798%2C3249&q=45&auto=format&w=926&fit=clip",
  truck: "https://www.volvotrucks.com/content/dam/volvo/volvo-trucks/markets/global/news-and-stories/press-release/2020/200212/1860x1050-pressrelease-electric-heavy-duty-trucks-image3.jpg",
  car: "https://tesztelok.hu/wp-content/uploads/mpla3.jpg",
  motorcycle: "https://lh3.googleusercontent.com/proxy/mg0nXniu3i8exwTHwSoe0nqKGF047Xmv0mkXuPRSxR2ZaJlNker1uwODLcGFqyNwChGf3J307nUJx6gb6vRCUL_Bu71hI5f3Rj6V0MV7lofSbV9N",
  bus: "https://m.blog.hu/om/omnibusz/image/cimlap_27.jpg",
  dog: "https://www.azenkutyam.hu/wp-content/uploads/2021/03/gettyimages-1250646517-1200x800.jpg",
  wolf: "https://static.dw.com/image/18461425_303.jpg",
  hyena: "https://travelafricamag.com/wp-content/uploads/2017/11/Hyena1024.jpg",
  fox: "https://www.welcomewildlife.com/wp-content/uploads/2019/01/Red-fox-300-0-%C2%A9-Stanislav-Duben-Shutterstock-e1563829913951.jpg",
  microwave_oven: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-clean-microwave-countertop-1588094996.jpg?crop=1.00xw:0.752xh;0,0.250xh&resize=1200:*",
  refrigirator: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/samsung-smart-fridge-family-hub-1565129732.png?crop=1.00xw:0.512xh;0,0.272xh&resize=1200:*",
  cupboard: "https://sc01.alicdn.com/kf/HTB1QiigXkUmBKNjSZFOq6yb2XXaK/230134915/HTB1QiigXkUmBKNjSZFOq6yb2XXaK.jpg",
  kitchen_sink: "https://blog.kitchenandbathclassics.com/hubfs/grohe-large1.jpg",
  tiger: "https://lh3.googleusercontent.com/proxy/mVZQTroSgKthtAb1qNQOJ2nr5-KbV_o8u9UZFNOJExcRVffOtFtlZXwkkHJQGJUl97qZCcW2gOXUt4XwOp1fxp4Zshh5hlqMJDfGAGJ2EB4C0bqV0Dq6EA_B6bIo483dUmZkxWZxOQ-7tDYJ1zjSp3g8D-IPbFXiH4QN",
  lion: "https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2020%2F10%2FUntitled-design-2020-10-14T175453.904.png&signature=78990468102c960fab4ea401b28e1009",
  panther: "https://assets1.ignimgs.com/2020/11/19/pink-panther-reboot-1605813320129.jpg",
  cheetah: "https://www.animalsaroundtheglobe.com/wp-content/uploads/2020/06/encounter-cheetah-in-wild.jpg",
  plane: "https://www.airlineratings.com/wp-content/uploads/uploads/B797.jpg",
  helicopter: "https://global-helicopter-service.com/wp-content/uploads/2018/10/bell-412-in-air-nigeria.jpg",
  blimp: "https://ca-times.brightspotcdn.com/dims4/default/3911fc8/2147483647/strip/true/crop/1800x867+0+0/resize/1486x716!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F33%2F99%2Fcf86146f456faf529620269028fa%2Fcaption-1-goodyear-blimp-wingfoot-three.jpg",
  jet: "https://imagevars.gulfnews.com/2020/07/26/WEB-200725-RAFALE-1595756330061_1738a7d3c4f_large.jpg",
  java: "https://miro.medium.com/max/1636/1*5h3Fv82Gsilyhh2URcIVZA.png",
  c: "https://programadoresbrasil.com.br/wp-content/uploads/2020/05/c-coding-example.jpg",
  sql: "https://www.researchgate.net/profile/Mohammad-Sadoghi/publication/283105667/figure/fig2/AS:668911880114192@1536492428810/SQL-code-example-of-a-query.png",
  python: "https://www.filepicker.io/api/file/2FUfYl4DTyauv7723l5L",
  halloween: "http://pecs.hit.hu/wp-content/uploads/2018/10/halloween-8k-ab1.jpg",
  christmas: "http://www.jamvk.hu/wp-content/uploads/2019/11/christmas.jpg",
  easter: "https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc5ODU2NTMzNDAyNjkxNTcz/easter-gettyimages-539272569.jpg",
  state_foundation_day: "https://www.danubiushotels.com/hu/magazin/wp-content/uploads/2018/08/Tuzijatek2015_2.jpg",
  beach: "http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg",
  pier: "https://images.adsttc.com/media/images/5bd0/b963/f197/cc96/d000/01eb/large_jpg/copyright_laurianghinitoiu_hastings_pier_(15_of_20).jpg?1540405597",
  dock: "https://dock8a.hu/thumbs/home/dock8a-terminal-866x500.jpg",
  amusement_park: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2017/06/02/580699-amusement-park-060217.jpg",
  avengers: "https://bgr.com/wp-content/uploads/2019/04/avengers-endgame.jpg?quality=70&strip=all",
  justice_league: "https://m.blog.hu/dv/dvdnews/image/justiceleague_snydercut_1000_6.png",
  jedi_high_council: "https://numidianprime.files.wordpress.com/2018/08/council2.jpg?w=660",
  gryffindor: "https://static1.srcdn.com/wordpress/wp-content/uploads/2018/12/Harry-Potter-Gryffindors.jpg",
  coal: "https://tce-live2.s3.amazonaws.com/media/new_article_images/dreamstime_xl_117325840.jpg",
  iron: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Iron_electrolytic_and_1cm3_cube.jpg/1200px-Iron_electrolytic_and_1cm3_cube.jpg",
  calcium: "//upload.wikimedia.org/wikipedia/commons/thumb/9/96/Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg/1200px-Calcium_unter_Argon_Schutzgasatmosph%C3%A4re.jpg",
  gold: "//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Gold_nugget_%28Australia%29_4_%2816848647509%29.jpg/1200px-Gold_nugget_%28Australia%29_4_%2816848647509%29.jpg",
  eggplant: "//post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/279359_2200-1200x628.jpg",
  carrot: "//live.staticflickr.com/6093/6237042125_1fcd6c7def_b.jpg",
  cucumber: "//live.staticflickr.com/4140/4921597750_f240a4098d_h.jpg",
  mushroom: "//live.staticflickr.com/3941/15067188063_87a66fec76_b.jpg",
};

export default imageArr;
