const { check } = require("express-validator");

exports.jobPostValidator = [
    check("job_title")
        .notEmpty().withMessage("Job title is required")
        .isString().withMessage("Invalid job title format")
        .customSanitizer((value) => {
            return value.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '')
        }),

    check("job_location")
        .notEmpty().withMessage("Job location is required")
        .isString().withMessage("Invalid job location format")
        .customSanitizer((value) => {
            return value.trim().toLowerCase()
        }),

    check('job_type')
        .notEmpty().withMessage("Job type is required")
        .isString().withMessage("Invalid job type format")
        .customSanitizer((value) => {
            return value.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
        }),

    check("job_experience")
        .notEmpty().withMessage("Job experience is required")
        .isString().withMessage("Invalid job experience format")
        .customSanitizer((value) => {
            return value.trim().toLowerCase()
        })

];

exports.jobPostUpdateValidation = [
    check("job_title")
      .optional() // Allow the field to be optional
      .isString().withMessage("Job title must be a string")
      .customSanitizer((value) => {
        if (!value) return value; // Return undefined or null if value doesn't exist
        return value.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
      }),
  
    check("job_location")
      .optional()
      .isString().withMessage("Invalid job location format")
      .customSanitizer((value) => {
        if (!value) return value;
        return value.trim().toLowerCase();
      }),
  
    check("job_type")
      .optional()
      .isString().withMessage("Invalid job type format")
      .customSanitizer((value) => {
        if (!value) return value;
        return value.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
      }),
  
    check("job_experience")
      .optional()
      .isString().withMessage("Invalid job experience format")
      .customSanitizer((value) => {
        if (!value) return value;
        return value.trim().toLowerCase();
      }),
  ];

  exports.createBlogValidation = [
    check('blog_title')
    .isEmpty().withMessage("Blog title is required")
    .isString().withMessage("Invalid blog title format")
    .customSanitizer((value) =>{
        return  value.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
    }),

    check('blog_description')
    .isEmpty().withMessage('Blog decription is required')
    .isString().withMessage('Invalid blog descripption format')
    .customSanitizer((value) => {
        return value.trim().toLowerCase()
    }),

    check('blog_author')
    .isEmpty().withMessage('Author name is required')
    .isString().withMessage('Invalid author name format')
    .customSanitizer((value) => {
        return value.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g,'')
    }),

    check('blog_author_pic')
    .optional()
    .isString().withMessage("Invalid blog image format"),

    check('blog_image')
    .isEmpty().withMessage('Blog image is required')
    .isString().withMessage('Invalid blog URL format'),

    check('blog_category')
    .isEmpty().withMessage('Blog category is required')
    .isString().withMessage('Invalid blog category format')
    .customSanitizer((value) =>{
        return value.trim().toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    })
  ]