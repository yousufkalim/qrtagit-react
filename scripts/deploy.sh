#!/bin/sh
# Ensure we're using the right aws profile
export AWS_PROFILE=websync

#sync the files
aws s3 sync build/ s3://qrtag.it.getting.started

#Invalidate the cloudfront cache so changes show up.
aws cloudfront create-invalidation --distribution-id EMZP38JAQHU4L --paths /\*