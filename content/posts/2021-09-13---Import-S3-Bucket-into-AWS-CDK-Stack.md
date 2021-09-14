---
title: Import S3 Bucket into AWS CDK Stack
date: "2021-09-12T00:00:00.000Z"
template: "post"
draft: false
slug: "import-s3-bucket-into-aws-cdk-stack"
category: "Infrastructure & Automation"
tags:
  - "AWS CDK"
  - "Go"
  - "S3"  
  - "Guidance"
description: "Import manually created S3 bucket to AWS CloudFormation stack provisioned with AWS Cloud Development Kit (CDK)"
---

Quite often at the beginning of the project lifecycle the S3 buckets (or other AWS resources of your interest) got created manually. 
When the project becomes mature and the number of managed AWS resources grows significantly, 
the task of convenient infrastructure management becomes quite urgent.

With [AWS CloudFormation](https://aws.amazon.com/cloudformation/) the entire infrastructure can be modeled with template file and supplied parameters.
The [AWS Cloud Development Kit (AWS CDK)](https://github.com/aws/aws-cdk) offers a high-level object-oriented abstractions 
to define AWS resources in the Infrastructure as a Code manner, and provision everything with AWS CloudFormation.

The feature to [import existing resources into a CloudFormation Stack](https://aws.amazon.com/blogs/aws/new-import-existing-resources-into-a-cloudformation-stack/) was introduced back in Nov 2019. 

Let's find out how to import manually created S3 bucket to AWS CloudFormation stack managed with AWS Cloud Development Kit (CDK).

## Disclaimer

I'm going to use the AWS CDK Go version which is currently in developer preview and is not recommended for production use.

## Prerequisites

* AWS CLI
* AWS IAM User with Programmatic Access (make sure to `aws configure`)
* Node.js v14.x
* AWS CDK Toolkit (`npm install -g aws-cdk`)
* VS Code or your IDE choice
* Go v1.16

## Create S3 bucket manually

You can skip this step if you already have a bucket to perform import operations on. 
But might be a good idea to experiment with 'guinea pig' S3 bucket.

![Create S3 Bucket](/media/2021-09-13/create-s3-bucket.png)

I've created mine called `bucket-test-import-into-cdk-1231293`.
🙈 Try to avoid calling AWS resources with the resource type in the name (e.g. don't start the S3 bucket name with `bucket-`).

## Init CDK project

Now, let's open the shell and create the project for AWS CDK managed stack where we would put all our resources' code constructs.

```sh
$ mkdir cdk-import-s3
$ cd cdk-import-s3
$ cdk init --language=go
...
✅ All done!
```

Now, open the folder in the VS Code.

Remove the default code for creating the SNS Topic as not required.
The stack func should look like:

```go
func NewCdkImportS3Stack(scope constructs.Construct, id string, props *CdkImportS3StackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	// The code that defines your stack goes here

	return stack
}
```

## Experiment - Define the Existing S3 Bucket in CDK Stack

Basically, let's define the existing S3 bucket and see what's happen.
Add the following code to `NewCdkImportS3Stack` func:


```go
	// The code that defines your stack goes here
	awss3.NewBucket(stack, jsii.String("ExistingBucket"), &awss3.BucketProps{
		AutoDeleteObjects: jsii.Bool(false),
		BucketName:        jsii.String("bucket-test-import-into-cdk-1231293"),
    RemovalPolicy:     awscdk.RemovalPolicy_RETAIN,
	})
```

Now let's check how CDK determines the diff for this scenario:

```sh
$ cdk diff --profile cdk-vorotech
```

![cdk diff](/media/2021-09-13/cdk-diff.png)

It seems that CDK was able to detect that the S3 bucket is the existing one. It's a good sign. Let's move on.

What going to happen if we deploy this stack configuration? Let's find out!

```sh
$ cdk deploy --profile cdk-vorotech
```

![cdk deploy failure](/media/2021-09-13/cdk-deploy-failure.png)

Ouch! The deploy operation has failed.

## Deploy Empty CloudFormation Stack

Our goal is to have at least empty CloudFormation stack deployed,
so we can follow the import instructions available for us.

Let's comment the S3 construct in the `NewCdkImportS3Stack` function and deploy:

```sh
$ cdk deploy --profile cdk-vorotech
CdkImportS3Stack: deploying...
CdkImportS3Stack: creating CloudFormation changeset...

 ✅  CdkImportS3Stack

Stack ARN:
arn:aws:cloudformation:eu-west-1:1234567890:stack/CdkImportS3Stack/38928900-14e0-11ec-a8f4-025f6561f5bb
```

## Import S3 Bucket to CloudFormation

Now we need to do some manual changes in AWS Console.

Find the CloudFormation stack provisioned by CDK and check available `Stack actions` dropdown.

![import resources into stack](/media/2021-09-13/import-resources-into-stack.png)

During an import operation, it will create a change set to import an existing resource into our existing stack.

We would need to provide a template that describes the entire stack, including the target resources - the one we are about to import. If existing stack resources are modified in the prepared template, the import fails. Also, we would need to identify the resources to import.

Click `Next` at the _Import Overview_ step and let's get started.

![specify template](/media/2021-09-13/specify-template.png)

At this step of the Import Wizard we need to specify the template for existing CloudFormation stack which includes target resources. So how do we provide this information?

First, uncomment the the S3 construct in the `NewCdkImportS3Stack` function.

Second, synthesize and print the CloudFormation template for this stack.

```sh
$ cdk synth --profile cdk-vorotech

Resources:
  ExistingBucket8EA66450:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: bucket-test-import-into-cdk-1231293
    UpdateReplacePolicy: Retain
    DeletionPolicy: Retain
    Metadata:
      aws:cdk:path: CdkImportS3Stack/ExistingBucket/Resource
  CDKMetadata:
    ...
```

As you notice, our target bucket has became a resource inside the CloudFormation stack as we planned.

Save the operation content to the YAML file and upload via Import Wizard in AWS.

```sh
cdk synth --profile cdk-vorotech > stack.yaml
```

![specify template done](/media/2021-09-13/specify-template-done.png)

After we done that, the Import Wizard suggests us that certain logical ID is new to our CloudFormation stack currently deployed in the AWS.

![identify resources](/media/2021-09-13/identify-resources.png)

Just fill the blank field with the S3 bucket name, `bucket-test-import-into-cdk-1231293` in my case.

Since I don't have the Parameters to provide, I click `Next` at the _Specify stack details_ step.

And... I got an error displayed at the last step.

![error creating the change set](/media/2021-09-13/error-creating-the-change-set.png)

The reason I got the error is that the import operation fails if existing stack resource modified during the Import action.

Seems, that CDK has updated some Part of the `CDKMetadata` during synthesizing the stack. 

Looking back at the `cdk synth` output the only property that looks suspicious to me is the CDKMetadata Analytics.
```yaml
  CDKMetadata:
    Type: AWS::CDK::Metadata
    Properties:
      Analytics: v2:deflate64:H4sIAA...
```

It's some kind of the the hash sum. Let's try to cheat it and later find they way to fix it 😝

## Cheating the CDKMetadata

Simply, comment out the S3 construct in the `NewCdkImportS3Stack` function again.

Run the synthesize command to print to std output

```sh
cdk synth --profile cdk-vorotech
```

Copy the value of the `Analytics:` key and replace it in the `stack.yaml` file that we has generated before.

Finally, repeat Import Wizard's step in AWS to re-upload `stack.yaml` file.

🥁 The moment of truth, the last step shows... 🎉

![change set created](/media/2021-09-13/change-set-created.png)

...that the desired Change set was created. `Import resources` now!

![import complete](/media/2021-09-13/import-complete.png)

## Get CDK mercy

Now we want to make sure that further CDK operations won't fail due to our manual intrusion into its process.

Let's uncomment the S3 construct in the `NewCdkImportS3Stack` function, and run some `cdk` commands.

```sh
$ cdk diff --profile cdk-vorotech

Stack CdkImportS3Stack
There were no differences

$ cdk deploy --profile cdk-vorotech

CdkImportS3Stack: deploying...
CdkImportS3Stack: creating CloudFormation changeset...

 ✅  CdkImportS3Stack

Stack ARN:
arn:aws:cloudformation:eu-west-1:1234567890:stack/CdkImportS3Stack/38928900-14e0-11ec-a8f4-025f6561f5bb
```

## Conclusion

It was fairly easy to import existing resource created manually into the CloudFormation stack managed by AWS CDK.
Personally I'm not a fan of the CloudFormation stack template format, I think they are bloated, hard to read and difficult to add complex conditions.
On the other hand the AWS CDK that operates the CloudFormation stack and allowing to define infrastructure constructs in code with the language of your choice is a real game changer.

See ya!
