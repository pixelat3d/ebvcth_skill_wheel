var skillTemplate = '<li class="ability{elite}" id="branch-{branch}" data-where="{tier}:{cell}:{branch}"><div class="ability-left"></div>{lockedPlaceholder}<div class="ap-cost-bubble">{cost} AP</div><div class="ability-right"><h2>{name}</h2><h3 class="{type}">{type} <span class="{elite}">{elite}</span></h3><div class="timers">{castTimeImage}<span class="cast-time">{castTime}</span>{cooldownImage}<span class="cooldown">{cooldown}</span></div><p>{description}</p>{purchasePlaceholder}</div></li>';
var skillEmptyTemplate = '<li class="ability">Select a cell from the skill wheel to begin.</li>';
var purchaseSkillButtonTemplate = '<a href="#" class="purchaseSkill button" data-cost="{cost}">Purchase</a>';
var lockedSkillImageTemplate = '<img src="img/locked.png" alt="Locked" title="This skill is locked, you must first purchase the skills above it." />';
var equipSkillTemplate = '<div class="skillEquipper"><h2>Equip in Slot</h2><a href="#" data-slot="1" class="equipSlot">1</a><a href="#" data-slot="2" class="equipSlot">2</a><a href="#" data-slot="3" class="equipSlot">3</a><a href="#" data-slot="4" class="equipSlot">4</a><a href="#" data-slot="5" class="equipSlot">5</a><a href="#" data-slot="6" class="equipSlot">6</a><a href="#" data-slot="7" class="equipSlot">7</a>';

var castTimeImageTemplate = '<img src="img/cast_time.png" title="Cast Time" />';
var cooldownImageTemplate = '<img src="img/cooldown.png" title="Cooldown" />';
