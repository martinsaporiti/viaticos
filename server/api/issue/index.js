'use strict';

var express = require('express');
var controller = require('./issue.controller');
var router = express.Router();


router.get('/:issueId/approveIssue', controller.approveIssue);
router.post('/', controller.addIssue);
router.delete('/:issueId', controller.delete);
router.post('/:issueId', controller.editIssue);
router.get('/', controller.index);

module.exports = router;