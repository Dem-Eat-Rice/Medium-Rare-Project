'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          authorId: 1,
          title: "Steak Medium Rare",
          body:
            `If you love your steak juicy and tender, 
            then you probably love medium rare steak. Cooked to 130–135°F (54–57°C), 
            a medium rare steak’s muscle fibers are just starting to contract, 
            but aren’t yet expelling all of their juices, and, for many people, 
            that means perfection. For some, that straddles the line too close to 
            uncooked, and they prefer something a little more noticeably done. 
            Medium steak temp is 135–145°F (57-63°C) and provides a slightly more 
            fibrous, less raw-feeling steak, though also less juicy.  In truth, 
            people love steaks cooked many different ways, so today we’re bringing 
            you a whole post on getting steak temps and getting them right. 
            We’ll let you in on the thermal secrets and critical temperatures that 
            will help you cook your steak perfectly every time.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          authorId: 1,
          title: "Rest your steak after cooking",
          body:
            `When you cook meat the protein in it sets. Generally the softer it feels, 
            the less cooked it is and vice versa. And cooking your steak to your 
            liking is a skill that comes with time and a few overcooked dinners too.  
            While using a thermometer is accurate and takes the guesswork out of it, 
            I feel there is something satisfying about being able to cook a steak 
            perfectly by feel alone.  If you cut straight into your beautiful piece of 
            steak after cooking it, it kind of defeats the purpose. The reason it 
            needs to rest is because the juices need time to redistribute, otherwise 
            it will just flow away, leaving you with a brown, overcooked piece of meat.  
            Another important thing to know is the residual heat will continue to cook 
            your steak after you’ve removed it from the grill or the pan. So if your 
            desired temperature is say 55C/130F, then it’s best to remove the meat a 
            few degrees south of this. It will come up to the desired temperature 
            during the resting period, giving you a perfectly cooked steak.  
            It fully depends on the size of the cut of beef but as a guide, bigger 
            roasts should rest for 10-20 minutes and your steak should breathe for at 
            least five minutes. But experiment with what works the best and you'll be 
            cooking mouth-watering, juicy steaks in no time.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("Posts", null, {});
  },
};
